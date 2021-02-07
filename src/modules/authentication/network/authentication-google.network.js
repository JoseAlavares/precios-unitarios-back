const ROOT = '/home/node/app'
const { responseNetwork } = require(`${ROOT}/src/utils/functions`)

exports.authenticationGoogle = async (req, resp) => {
    return responseNetwork(
        resp,
        false,
        200,
        'Successful'
    )
}