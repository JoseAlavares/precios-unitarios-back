const GetAllPlans = require('./controller/get-all-plans.controller')
const { responseNetwork } = require('../../utils/functions')

exports.getAllPlans = async (req, resp) => {
    const result = await GetAllPlans()

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