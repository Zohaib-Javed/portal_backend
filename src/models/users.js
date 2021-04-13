'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.grade,{foreignKey:'gradeId'})
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