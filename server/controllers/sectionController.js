const { Section, Material } = require('../models');
const path = require("path");
const fs = require("fs");
const { Op } = require('sequelize');

exports.getSectionsByCourseId = async (req, res) => {
  const { courseId } = req.params;

  try {
    const sections = await Section.findAll({
      where: { course_id: courseId },
      order: [['section', 'ASC']]
    });

    if (sections.length === 0) {
      return res.status(404).json({ message: 'No sections found for this course' });
    }

    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { courseId, id } = req.params;
    const { section_name } = req.body;

    const sectionData = await Section.findOne({
      where: {
        course_id: courseId,
        section: id
      }
    });

    if (!sectionData) {
      return res.status(404).json({ message: "Section not found" });
    }

    await Section.update(
      { section_name },
      {
        where: {
          course_id: courseId,
          section: id
        }
      }
    );

    res.json({ message: "Section updated", section: sectionData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.createSection = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { section_name, after_section } = req.body;

    await Section.increment(
      { section: 1 },
      {
        where: {
          course_id: courseId,
          section: { [Op.gte]: after_section + 1 }
        }
      }
    );

    await Material.increment(
      { section: 1 },
      {
        where: {
          course_id: courseId,
          section: { [Op.gte]: after_section + 1 }
        }
      }
    );

    const newSection = await Section.create({
      course_id: courseId,
      section: after_section + 1,
      section_name
    });

    res.json({
      message: "Section successfully created",
      section: newSection
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { courseId, id } = req.params;
    const sectionNumber = Number(id);

    // Temukan section berdasarkan course_id + section number
    const section = await Section.findOne({
      where: {
        course_id: courseId,
        section: sectionNumber
      },
      attributes: ["id", "course_id", "section", "section_name"]
    });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    console.log("Deleting section:", sectionNumber);
    console.log("Reordering sections >", sectionNumber);

    // Hapus section
    await Section.destroy({
      where: {
        course_id: courseId,
        section: sectionNumber
      }
    });

    // Geser section lain yang lebih besar
    await Section.increment(
      { section: -1 },
      {
        where: {
          course_id: courseId,
          section: {
            [Op.gt]: sectionNumber
          }
        }
      }
    );

    await Material.increment(
      { section: -1 },
      {
        where: {
          course_id: courseId,
          section: {
            [Op.gt]: sectionNumber
          }
        }
      }
    );

    return res.json({ message: "Section deleted & reordered" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
