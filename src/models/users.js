'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      this.belongsTo(models.grade,{foreignKey:'gradeId'})
      this.hasMany(models.duePayment)
    }
  };
  User.init({
    name: {type:DataTypes.STRING,allowNull:false},
    email: {type:DataTypes.STRING,unique:true,allowNull:false},
    password: {type:DataTypes.STRING,allowNull:false},
    role: {type:DataTypes.STRING,allowNull:false},
    gradeId:{type:DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'user',
  });

  User.prototype.validPassword=(userPassword,paramPassword)=>{
    return userPassword===paramPassword;
  }
  return User;
};