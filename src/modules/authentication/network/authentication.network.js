const ROOT = '/home/node/app'
const { responseNetwork } = require(`${ROOT}/src/utils/functions`)
const AuthenticationController = require(`${ROOT}/src/modules/authentication/controller/authentication.controller`)

exports.authentication = async (req, resp) => {
    
    const user = new AuthenticationController()
    const validate = ['email', 'password']
    let errors = new Array()

    for(let i=0; i<validate.length; i++) {
        if(!Object.keys(req.body).includes(validate[i]) || !req.body[validate[i]])
            errors.push(`The field ${validate[i]} can\'t be empty`)
    }
    
    if(errors.length) {
        console.error('Errors in the validation entries')
        console.table(errors)
        return responseNetwork(
            resp,
            true,
            422,
            'Unproccessable entity'
        )        
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