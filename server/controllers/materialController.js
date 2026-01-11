const { Material, Course } = require('../models');
const path = require("path");
const fs = require("fs");

exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll({ include: 'course' });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch materials', error: error.message });
  }
};

exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findByPk(req.params.id, { include: 'course' });
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.json(material);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch material', error: error.message });
  }
};

exports.getMaterialsByCourseId = async (req, res) => {
  const { courseId } = req.params;

  try {
    const materials = await Material.findAll({
      where: { course_id: courseId }
    });

    if (materials.length === 0) {
      return res.status(404).json({ message: 'No materials found for this course' });
    }

    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMaterial = async (data) => {
  try {
    const material = await Material.create(data);
    return material;
  } catch (err) {
    throw err; // lempar error ke route, biar route yang handle res
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);

    if (!material) {
      return res.status(404).json({
        message: "Material not found",
      });
    }

    if (material.materials_type === "Dokumen" && material.materials_doc) {
      const filePath = path.join(
        "D:/Skripsi/Upload/TutorCerdas/client/public",
        material.materials_doc
      );

      // cek file ada baru hapus
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await material.destroy();

    res.json({
      message: "Material deleted successfully",
      deletedMaterial: material
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      message: "Failed to delete material",
      error: error.message,
    });
  }
};

exports.updateMaterialStatus = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const material = await Material.findByPk(id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    // Ambil status lama, pastikan array
    let currentStatus = Array.isArray(material.status) ? [...material.status] : [];

    // Tambahkan userId jika belum ada
    if (!currentStatus.includes(userId)) {
      currentStatus.push(userId);
    }

    // Update hanya status
    await material.update({ status: currentStatus });

    res.json({
      message: 'User added to material status successfully',
      data: {
        material_id: material.material_id,
        status: currentStatus
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update material status', error: error.message });
  }
};

exports.updateMaterial = async (id, data) => {
  try {
    const material = await Material.findByPk(id);
    if (!material) return null;

    await material.update(data);
    return material;
  } catch (err) {
    throw err;
  }
};
