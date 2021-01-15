const ROOT = '/home/node/app'
const UserModel = require(`${ROOT}/src/models/user.model`)
const { generateToken } = require(`${ROOT}/src/utils/functions`)

const { Op } = require('sequelize')

const GoogleRedirect = async (data) => {
    try {
        const _user = (data.givenName) ? data.givenName : ''
        const email = (data._json.email) ? data._json.email : ''

        const user = await UserModel.findOne({
            where: { [Op.or]: [{name: _user}, {email: email}] }
        })

        if(!user){
            return {error: true, message: 'Error 404', status_code: 404}
        }

        const token = generateToken({sub: user.id, name: user.email})
        return {message: 'Successful', data: token}
    } catch (err) {
        console.error(
            err.message, 
            err.code, 
            err.stack
        )
        return {error: true, message: 'Error in the server', status_code: 500}
    }
}

module.exports = GoogleRedirect