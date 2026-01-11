const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const authMiddleware = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/authorizeRole');
const { convertToPDF } = require("../utils/convertToPDF");
const { Material } = require('../models');
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// function rebuildVectorStore(courseId) {
//   const cmd = `"C:/Users/dylan/AppData/Local/Microsoft/WindowsApps/python3.11.exe" "D:/Skripsi/Upload/TutorCerdas/server/vector.py" --course_id=${courseId}`;

//   console.log("Running vector command:", cmd);

//   exec(cmd, (err, stdout, stderr) => {
//     if (err) {
//       console.error("Vector build error:", err);
//     }
//     if (stderr) {
//       console.error("Vector build stderr:", stderr);
//     }
//     if (stdout) {
//       console.log("Vector build stdout:", stdout);
//     }
//   });
// }


const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      let courseId = req.body.course_id;

      // Jika edit, ambil dari database
      if (!courseId && req.params.id) {
        const material = await Material.findByPk(req.params.id);
        if (material) courseId = material.course_id;
      }

      if (!courseId) {
        // kalau masih undefined → error ditangani multer
        return cb(new Error("course_id tidak ditemukan"), null);
      }

      const uploadPath = path.join(
        // "D:/Skripsi/Upload/TutorCerdas/client/public/data",
        "C:/Users/PIPP/Documents/TutorDek/TutorCerdas/client/public/data",
        courseId.toString()
      );

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);

    } catch (err) {
      cb(err, null);
    }
  },

  filename: function (req, file, cb) {
    let originalName = path.parse(file.originalname).name;
    originalName = originalName.replace(/[^a-zA-Z0-9_-]/g, "_");

    cb(null, originalName + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// GET semua materials
router.get('/', authMiddleware, materialController.getAllMaterials);

// GET material by ID
router.get('/:id', authMiddleware, materialController.getMaterialById);
// router.get('/:id', materialController.getMaterialById);


// GET material-> course by ID
router.get('/course/:courseId', authMiddleware, materialController.getMaterialsByCourseId);

router.post("/", upload.single("materials_doc"), async (req, res) => {
  try {
    let pdfPath = null;
    const courseId = req.body.course_id;

    if (req.file) {
      // const uploadDir = `D:/Skripsi/Upload/TutorCerdas/client/public/data/${courseId}`;
      const uploadDir = `C:/Users/PIPP/Documents/TutorDek/TutorCerdas/client/public/data/${courseId}`;
      const originalPath = req.file.path;

      let baseName = path.parse(req.file.originalname).name;
      baseName = baseName.replace(/[^a-zA-Z0-9_-]/g, "_");

      const finalPdfPath = path.join(uploadDir, baseName + ".pdf");

      const ext = path.extname(req.file.originalname).toLowerCase();

      if (ext === ".pdf") {
        // langsung pindahkan ke lokasi final
        fs.renameSync(originalPath, finalPdfPath);
      } else {
        let convertedPdf = await convertToPDF(originalPath, uploadDir);

        fs.renameSync(convertedPdf, finalPdfPath);
        fs.unlinkSync(originalPath);
      }

      let normalized = finalPdfPath.replace(/\\/g, "/");

      pdfPath = normalized.replace(
        // "D:/Skripsi/Upload/TutorCerdas/client/public",
        "C:/Users/PIPP/Documents/TutorDek/TutorCerdas/client/public",
        ""
      );
    }

    // SIMPAN KE DB — controller expect object biasa
    const material = await materialController.createMaterial({
      course_id: req.body.course_id,
      section: req.body.section,
      materials_title: req.body.materials_title,
      materials_desc: req.body.materials_desc,
      materials_type: req.body.materials_type,
      materials_duration: req.body.materials_duration,
      materials_doc: pdfPath,
      materials_video: req.body.materials_video,
      materials_link: req.body.materials_link,
    });

    res.json({
      message: "Material uploaded & saved",
      material,
    });

    // setTimeout(() => rebuildVectorStore(material.course_id), 100);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: "Internal error", error: err.message });
  }
});



// PUT update material (Admin & Teacher)
// router.put('/:id', authMiddleware, authorizeRole(['teacher']), materialController.updateMaterial);
router.put(
  '/:id',
  authMiddleware,
  authorizeRole(['teacher']),
  upload.single('materials_doc'),
  async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.user?.id;

      const { status: newStatusFromBody, ...bodyData } = req.body;
      const updateData = { ...bodyData };

      delete updateData.materials_doc; // pastikan tidak dari body

      const material = await Material.findByPk(id);
      if (!material) return res.status(404).json({ message: 'Material not found' });

      const oldType = material.materials_type;
      const newType = updateData.materials_type || oldType;
      const courseId = updateData.course_id || material.course_id;

      let finalDocPath = material.materials_doc;

      if (oldType === 'Dokumen' && newType !== 'Dokumen') {
        if (material.materials_doc) {
          const absPath = path.join(
            // "D:/Skripsi/Upload/TutorCerdas/client/public",
            "C:/Users/PIPP/Documents/TutorDek/TutorCerdas/client/public",
            material.materials_doc.replace(/^\//, "")
          );
          if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
        }
        finalDocPath = null;
        updateData.materials_doc = null;
      }

      if (newType === 'Dokumen' && req.file) {
        // const uploadDir = `D:/Skripsi/Upload/TutorCerdas/client/public/data/${courseId}`;
        const uploadDir = `C:/Users/PIPP/Documents/TutorDek/TutorCerdas/client/public/data/${courseId}`;
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const originalPath = req.file.path;

        let baseName = path.parse(req.file.originalname).name;
        baseName = baseName.replace(/[^a-zA-Z0-9_-]/g, '_');

        const finalPdfPath = path.join(uploadDir, baseName + '.pdf');
        const ext = path.extname(req.file.originalname).toLowerCase();

        if (material.materials_doc) {
          const oldAbs = path.join(
            // "D:/Skripsi/Upload/TutorCerdas/client/public",
            "C:/Users/PIPP/Documents/TutorDek/TutorCerdas/client/public",
            material.materials_doc
          );
          if (fs.existsSync(oldAbs)) fs.unlinkSync(oldAbs);
        }

        if (ext === ".pdf") {
          fs.renameSync(originalPath, finalPdfPath);
        } else {
          const converted = await convertToPDF(originalPath, uploadDir);
          fs.renameSync(converted, finalPdfPath);
          if (fs.existsSync(originalPath)) fs.unlinkSync(originalPath);
        }

        let normalized = finalPdfPath.replace(/\\/g, "/");
        finalDocPath = normalized.replace(
          // "D:/Skripsi/Upload/TutorCerdas/client/public",
          "C:/Users/PIPP/Documents/TutorDek/TutorCerdas/client/public",
          ""
        );

        updateData.materials_doc = finalDocPath; // GA DIHAPUS LAGI
      }

      let currentStatus = Array.isArray(material.status) ? [...material.status] : [];
      if (Array.isArray(newStatusFromBody)) {
        newStatusFromBody.forEach((uid) => {
          if (!currentStatus.includes(uid)) currentStatus.push(uid);
        });
      }
      if (userId && !currentStatus.includes(userId)) currentStatus.push(userId);
      updateData.status = currentStatus;

      const updated = await materialController.updateMaterial(id, updateData);

      res.json({
        message: 'Material updated',
        material: updated,
      });

      // setTimeout(() => rebuildVectorStore(courseId), 100);

    } catch (err) {
      console.error('PUT ERROR:', err);
      return res.status(500).json({ message: 'Error updating material', error: err.message });
    }
  }
);


// PATCH /materials/:id/status → update status (tandai user sudah akses)
router.patch('/:id/status', authMiddleware, materialController.updateMaterialStatus);
router.patch('/:id', authMiddleware, authorizeRole(['teacher', 'student']), materialController.updateMaterial);

// DELETE material (Admin & Teacher)
// router.delete('/:id', authMiddleware, authorizeRole(['teacher']), materialController.deleteMaterial);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRole(["teacher"]),
  async (req, res) => {
    const result = await materialController.deleteMaterial(req, res);

    if (!result || !result.deletedMaterial) return;

    const courseId = result.deletedMaterial.course_id;
    // setTimeout(() => rebuildVectorStore(courseId), 100);
  }
);

module.exports = router;
