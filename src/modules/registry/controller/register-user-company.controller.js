const UserModel = require('../../../models/user.model')
const CompanyModel = require('../../../models/company.model')
const sequelize = require('../../../config/database-connection')

class RegistryController {
    constructor() {
        //this.transaction = null
    }

    async createUserAndCompany(data) {
        const transaction = await sequelize.transaction()

        try {             
            const inserCompany = await CompanyModel.create({
                PlanId: data.plan_id,
                name: data.company_name,
                rfc: data.rfc,
                email: data.company_email,
                legalRepresentative: data.legal_representative
            })
            
            const insertUser = await UserModel.create({
                CompanyId: inserCompany.dataValues.id,
                RolId: data.rol,
                name: data.name,
                email: data.personal_email,
                password: data.password,                
                //profilePicture: data.profile_picture
            })            

            if(!insertUser || !inserCompany) {
                console.error('The user or the company don`t was inserted')
                await transaction.rollback()

                return {
                    error: true,
                    message: 'There\'s been a problem',
                    status_code: 500
                }
            }

            await transaction.commit()
            return {
                message: 'Successful'
            }
        } catch (err) {
            await transaction.rollback()
            console.error(err)            
            return {
                error: true,
                message: 'Error in the server',
                status_code: 500
            }
        }
    }
}

module.exports = RegistryController
//module.exports = {createUserAndCompany}