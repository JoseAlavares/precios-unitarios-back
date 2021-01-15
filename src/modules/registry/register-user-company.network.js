const { responseNetwork } = require('../../utils/functions')

exports.register = async (req, resp) => {
    const RegistryController = require('./controller/register-user-company.controller')
    //const { createUserAndCompany } = require('./controller/register-user-company.controller')
    const register = new RegistryController()
    let errors = new Array()
    const validateUser = ['name', 'personal_email', 'password', 'rol', 'profile_picture']
    const validateCompany = ['plan_id', 'company_name', 'rfc', 'company_email', 'legal_representative']
    let dataUser = {}
    let dataCompany = {}

    //Validations for user input
    for(let i=0;i<validateUser.length;i++) {
        if(!Object.keys(req.body).includes(validateUser[i]) || !req.body[validateUser[i]]){
            errors.push(`The field ${validateUser[i]} can't be empty`)
        }        
    }

    //Validations
    for(let j=0;j<validateCompany.length;j++) {
        if(!Object.keys(req.body).includes(validateCompany[j]) || !req.body[validateCompany[j]]) {
            errors.push(`The field ${validateCompany[j]} can't be empty`)
        }
    }

    if(errors.length) {
        console.log('Parameter error in the registry')
        console.table(errors)
        return responseNetwork(
            resp,
            true,
            422,
            'Unproccessable entity'
        )
    }

    const result = await register.createUserAndCompany(req.body)
    //const result = await createUserAndCompany(req.body)

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