'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DuePayment extends Model {

    static associate(models) {
      this.belongsTo(models.user,{foreignKey:'userId'})
      this.hasOne(models.payment)
    }
  };
  DuePayment.init({
    amount: {type:DataTypes.INTEGER,allowNull:false},
    dueDate: {type:DataTypes.DATE,allowNull:false},
    description: {type:DataTypes.STRING},
    userId: {type:DataTypes.INTEGER,allowNull:false},
    fineAfterDueDate: {type:DataTypes.INTEGER},
    isPaid:{type:DataTypes.BOOLEAN,allowNull:false},
  }, {
    sequelize,
    modelName: 'duePayment',
  });
  return DuePayment;
};