'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    
    static associate(models) {
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