'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.associate = function(models) {
        Course.belongsToMany(models.User, { through: models.Enrollment, foreignKey: 'courseId' });
      };
      
    }
  }
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    course_img: DataTypes.STRING,

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Course extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Course.associate = function(models) {
//         Course.belongsToMany(models.User, { through: models.Enrollment, foreignKey: 'courseId' });
//       };
      
//     }
//   }
//   Course.init({
//     title: DataTypes.STRING,
//     description: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Course',
//   });
//   return Course;
// };

  }, {
    sequelize,
    modelName: 'Course',
  });

  return Course;
};
