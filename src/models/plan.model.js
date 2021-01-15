'use strict'
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/database-connection')

class Plan extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Plan.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  stripeKey: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false,
    validate: {min: 1},
  },
  description: {
    type: DataTypes.TEXT,
  },
  active: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'Plan',
})

module.exports = Plan
