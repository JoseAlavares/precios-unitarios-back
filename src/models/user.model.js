const { Model, DataTypes } = require('sequelize')
const sequelize = require("../config/database-connection")
const CompanyModel = require('./company.model')
const RolModel = require('./rol.model')

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
  
User.init({  
  CompanyId: {
    type: DataTypes.INTEGER,
    references: {
      model: CompanyModel,
      key: 'id'
    }
  },
  RolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: RolModel,
        key: "id"
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
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
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
      min: {
        args: 6,
        msg: 'The password have to be greater or equals than 6 characters'
      }
    }
  },
  active: DataTypes.BOOLEAN
}, {
  sequelize,
  modelName: 'User'
})

module.exports = User