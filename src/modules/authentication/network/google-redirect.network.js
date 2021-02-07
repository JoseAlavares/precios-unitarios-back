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

