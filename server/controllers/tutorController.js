const { Tutor } = require("../models");
const { exec } = require("child_process");

exports.createTutor = async (req, res) => {
  try {
    const { course_id, tutor_status, last_update } = req.body;
    const newTutor = await Tutor.create({ course_id, tutor_status, last_update });
    res.status(201).json(newTutor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTutorStatus = async (req, res) => {
  const { courseId } = req.params;

  let tutor = await Tutor.findByPk(courseId);
  if (!tutor) {
    tutor = await Tutor.create({ course_id: courseId });
  }

  res.json(tutor);
};


exports.toggleTutor = async (req, res) => {
  const { courseId } = req.params;
  const { tutor_status } = req.body;

  const tutor = await Tutor.findByPk(courseId);
  if (!tutor) return res.status(404).json({ message: "Tutor not found" });

  await tutor.update({ tutor_status });

  res.json({ message: "Tutor updated", tutor });
};


exports.rebuildVector = async (req, res) => {
  const { courseId } = req.params;

  // const cmd = `"C:/Users/dylan/AppData/Local/Microsoft/WindowsApps/python3.11.exe" "D:/Skripsi/Upload/TutorCerdas/server/vector.py" --course_id=${courseId}`;
  const cmd = `python "C:/Users/PIPP/Documents/TutorDek/TutorCerdas/server/vector.py" --course_id=${courseId}`;

  console.log("Running:", cmd);

  const process = exec(cmd);

  process.stdout.on("data", (data) => {
    console.log("PYTHON:", data);
  });

  process.stderr.on("data", (err) => {
    console.error("PYTHON ERROR:", err);
  });

  process.on("exit", (code) => {
    console.log("PYTHON EXIT CODE:", code);

    Tutor.update(
      { last_update: new Date() },
      { where: { course_id: Number(courseId) } }
    )
    .then(() => {
      console.log("Last update saved.");
    })
    .catch(err => {
      console.error("Failed updating last_update:", err);
    });
  });

  res.json({ message: "Rebuild started" });
};
