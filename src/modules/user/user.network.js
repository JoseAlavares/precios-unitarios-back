const { responseNetwork } = require('../../utils/functions')
const USER_MODULE = `${process.env.ROOT}/src/modules/user`

exports.registerUser = async (req, resp) => {
    const UserController = require(`${USER_MODULE}/controller/user.controller`)
    const user = new UserController()

    let errors = 0
    const validate = ['name', 'email', 'password', 'rol', 'profile_picture']
    for(let i=0; i<validate.length; i++) {
        if(!Object.keys(req.body).includes(validate[i]) || !req.body[validate[i]])
            errors.push(`The field ${validate[i]} can\'t be empty`)
    }

    if(errors.length) {
        return responseNetwork(
            resp,
            true,
            422,
            'Unprocesable entity'
        )
    }

    const result = await user.CreateUser(req.body)

    if(result.error) {
        return responseNetwork(
            resp,
            true,
            result.status_code
        )
    }

    return responseNetwork(
        resp,
        false,
        201,
        result.message
    )
}

exports.getUsers = async (req, resp) => {
    const result = await GetUsers()

    if(result.error) {
        return responseNetwork(
            resp,
            true,
            result.status_code,
            result.message
        )
    }

    return responseNetwork(
        resp,
        false,
        200,
        result.message,
        result.data
    )
    
}