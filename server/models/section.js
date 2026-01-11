'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    static associate(models) {
      Section.belongsTo(models.Course, {
        foreignKey: 'course_id',
        as: 'course'
      });
    }
  }
  Section.init({
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    section: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    section_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Section',
    tableName: 'Section',
    timestamps: true
  });
  return Section;
};