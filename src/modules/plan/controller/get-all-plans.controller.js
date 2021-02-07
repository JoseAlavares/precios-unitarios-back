const PlanModel = require('../../../models/plan.model')

const GetAllPlans = async () => {
    try {
        const plans = await PlanModel.findAll({
            attributes: ['id', 'name', 'price', 'description'],
            where: {active: true}
        })

        if(!plans) {
            return {
                error: true,
                status_code: 404,
                message: 'There not exists plans'
            }
        }

        return {
            message: 'Successful',
            data: plans
        }
    } catch (error) {
        console.error(error.message)
        return {
            error: true,
            message: 'Error in the server',
            status_code: 500
        }
    }
}

module.exports = GetAllPlans