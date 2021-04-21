'use strict';
const {
  Model
} = require('sequelize');
const bcrypt=require('bcrypt');

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
  User.beforeCreate(async(user)=>{
    const pass=await bcrypt.hash(user.password,10);
    if(pass){
      user.password=pass;
    }
  })
  User.prototype.validPassword=async (userPassword,paramPassword)=>{
    const passwordsMatch = await bcrypt.compare(paramPassword, userPassword);
    return passwordsMatch;
  }
  return User;
};