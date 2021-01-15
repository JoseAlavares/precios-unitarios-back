const THIS_MODULE = `${process.env.ROOT}/src/modules/company`
const { responseNetwork } = require(`${process.env.ROOT}/src/utils/functions`)

exports.createCompany = async (req, resp) => {
    const CompanyController = require(`${THIS_MODULE}/controller/company.controller`)
    const company = new CompanyController()
    const validate = ['plan_id', 'name', 'rfc', 'company_email', 'legal_representative']
    let errors = new Array()
    
    for(let i=0;i<validate.length;i++) {        
        if(!Object.keys(req.body).includes(validate[i]) || !req.body[validate[i]]) {
            errors.push(`The field ${validate[i]} can\'t be empty`)
        }
    }

    if(errors.length) {
        console.error('Parameters errors company')
        console.table(errors)

        return responseNetwork(
            resp,
            true,
            422,
            'Unproccessable entity'
        )
    }

    const result = await company.saveCompany(req.body)

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
        201,
        result.message
    )
}

