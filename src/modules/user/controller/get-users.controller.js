const UserModel = require('../../../models/user.model')
const RolModel = require('../../../models/rol.model')

const GetUsers = async () => {
    try {
        const users = await UserModel.findAll({
            attibutes: ['id', 'name', 'email'],
            include: [{model: RolModel, attributes: ['name']}],
            where: {active: true}
        })

        if(users) {
            return {message: 'Successfull', data: users}
        }

        return {error: true, message: 'Not exists users', status_code: 404}
    } catch(err) {
        console.error(err.message)
        return {error: true, message: 'An error ocurred in the server', status_code: 500}
    }
}

module.exports = { GetUsers }