module.exports = (sequelize, DataTypes) => {
  const Tutor = sequelize.define("Tutor", {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    tutor_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    last_update: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
    }
  }, {
    tableName: "tutor",
    timestamps: false
  });

  return Tutor;
};
