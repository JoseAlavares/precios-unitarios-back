const UserModel = require('../../../models/user.model')
//const { generatePassword } = require('./')

const CreateUser = async (data) => {
    //data.password = generatePassword(data.password)
    try {
        const result = await UserModel.create(data)

        if(result) {
            return {message: 'Successful'}
        }

        return {error: true, message: 'Not exists users', status_code: 404}
    } catch(err) {
        console.error(err.message)
        return {error: true, message: 'Error in the server', status_code: 500}
    }
}

module.exports = { CreateUser }