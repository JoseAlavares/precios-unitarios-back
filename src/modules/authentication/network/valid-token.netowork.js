const ROOT = '/home/node/app'
const { responseNetwork } = require(`${ROOT}/src/utils/functions`)

exports.validToken = async (req, resp) => {
    /*const AuthenticationController = require(`${ROOT}/src/modules/authentication/controller/authentication.controller`)
    const Auth = new AuthenticationController()
    const result = Auth.validToken(req.body.token)

    if(result.error) {
        return responseNetwork(
            resp,
            true,
            401,
            'Error'
        )        
    }*/

    return responseNetwork(
        resp,
        false,
        200,
        'Successful'
    )
}