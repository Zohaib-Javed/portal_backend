'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    
    static associate(models) {
      this.belongsTo(models.duePayment,{foreignKey:'duePaymentId'})
    }
  };
  Payment.init({
    amount: {type:DataTypes.INTEGER,allowNull:false},
    date: {type:DataTypes.DATE,allowNull:false},
    duePaymentId: {type:DataTypes.INTEGER,allowNull:false}
  }, {
    sequelize,
    modelName: 'payment',
  });
  return Payment;
};