'use strict'
const MODELS_PATH = `${process.env.ROOT}/src/models`
const {Model, DataTypes} = require('sequelize')
const PlanModel = require(`${MODELS_PATH}/plan.model`)
const sequelize = require(`${process.env.ROOT}/src/config/database-connection`)

class Company extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Company.init({
  PlanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PlanModel,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rfc: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isRfc(value) {
        const regex = new RegExp(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$/)
        if(!regex.test(value)) {
          throw new Error('This value not is a valid RFC')
        }
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  legalRepresentative: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  active: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'Companies',
})
  
module.exports = Company