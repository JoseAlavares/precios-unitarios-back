const MODELS = `${process.env.ROOT}/src/models`
const CompanyModel = require(`${MODELS}/company.model`)

class CompanyController {
    constructor() {}

    async saveCompany(data) {
        try {
            const resultInsert = await CompanyModel.create({
                PlanId: data.plan_id,
                name: data.name,
                rfc: data.rfc,
                email: data.company_email,
                legalRepresentative: data.legal_representative,
                active: true
            })

            if(!resultInsert) {
                return {
                    error: true, 
                    message: 'There\'s been a problem', 
                    status_code: 500
                }
            }

            return {message: 'Successful'}
        } catch (error) {
            console.error(error)
            return {
                error: true,
                message: 'Error in the server',
                status_code: 500
            }
        }
    }
}

module.exports = CompanyController