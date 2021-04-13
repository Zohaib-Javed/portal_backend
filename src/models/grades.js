'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.user)
    }
  };
  Grade.init({
    gradeNum: {type:DataTypes.INTEGER,allowNull:false,unique:true}
  }, {
    sequelize,
    modelName: 'grade',
  });
  return Grade;
};