const ROOT = '/home/node/app'
const GoogleRedirect = require(`${ROOT}/src/modules/authentication/controller/google-redirect.controller`)
const { responseNetwork } = require(`${ROOT}/src/utils/functions`)


exports.googleRedirect = async (req, resp) => {
    let flag = false

    //if(req.body.id) flag = true
    //if(req.body.user) flag = true
    //if(req.body.email) flag = true
    if(req.user) flag = true

    if(!flag) {
        return responseNetwork(
            resp,
            true,
            422,
            'Unprocessable unity'
        )
    }

    const result = await GoogleRedirect(req.user)

    if(result.error) {
        return responseNetwork(
            resp,
            false,
            result.status_code,
            result.message
        )
    }

    /*return responseNetwork(
        resp,
        false,
        200,
        result.message,
        result.data
    )*/
    resp.redirect(`http://localhost:3000/auth?token=${result.data}`)
}

exports.authentication = async (req, resp) => {
    const AuthenticationController = require(`${ROOT}/src/modules/authentication/controller/authentication.controller`)
    const user = new AuthenticationController()
    const validate = ['email', 'password']
    let errors = new Array()

    for(let i=0; i<validate.length; i++) {
        if(!Object.keys(req.body).includes(validate[i]) || !req.body[validate[i]])
            errors.push(`The field ${validate[i]} can\'t be empty`)
    }
    
    if(errors.length) {
        return responseNetwork(
            resp,
            true,
            422,
            'Unproccessable entity'
        )
        console.error('Errors in the validation entries')
        console.table(error)

    }
    
    const result = await user.loginUser(req.body.email, req.body.password)
    console.log(result)
    if(result.error) {
        return responseNetwork(
            resp,
            true,
            result.status_code,
            result.message
        )
    }

    //resp.cookie('token', result.token)
    return responseNetwork(
        resp,
        false,
        200,
        'Successful',
        result.token
    )
}

exports.authenticationGoogle = async (req, resp) => {
    return responseNetwork(
        resp,
        false,
        200,
        'Successful'
    )
}

exports.validToken = async (req, resp) => {
    const AuthenticationController = require(`${ROOT}/src/modules/authentication/controller/authentication.controller`)
    const Auth = new AuthenticationController()
    const result = Auth.validToken(req.body.token)

    if(result.error) {
        return responseNetwork(
            resp,
            true,
            401,
            'Error'
        )        
    }

    return responseNetwork(
        resp,
        false,
        200,
        'Successful'
    )
}