const UserModel = require('../../../models/user.model')
const { OAuth2Client } = require('google-auth-library')
const { 
    validatePassword, 
    generateToken, 
    validateToken 
} = require('../../../utils/functions')

class AuthenticationController {
    constructor() {
        this.clientId = process.env.CLIENT_ID
        this.clientSecret = process.env.CLIENT_SECRET
        this.client = new OAuth2Client(
            this.clientId,
            this.clientSecret,
            'postMessage'
        )        
    }

    async loginUser(email, password) {
        try {
            const user = await UserModel.findOne({
                attributes: ['id', 'email', 'password'],
                where: {email: email}
            })
            
            if(!user){
                return {
                    error: true, 
                    message: 'Don\'t exists the users', 
                    status_code: 404
                }
            }
            
            const validPassword = await validatePassword(password, user.dataValues.password)
            
            if(!validPassword) {
                return {
                    error: true, 
                    message: 'Don\'t exists the user', 
                    status_code: 404
                }
            }

            const data = {sub: user.dataValues.id, name: user.dataValues.email} 
            return {message: 'Successful', token: generateToken(data)}
        } catch (e) {
            console.error(e.message)
            return {
                error: true, 
                message: 'Error in the server', 
                status_code: 500
            }
        }        
    }

    async loginGoogle(code) {
        const result = await this.client.getToken(code)
        const idToken = result.tokens.id_token
        const ticket = await this.client.verifyToken({
            idToken,
            audience: this.clientId
        })
        const payload = ticket.getPayload()
        
        return payload
    }

    validToken(token) {
        try {
            const decoded = validateToken(token)
            if(decoded) {
                return {message: 'Successful'}
            }

            return {error: true, message: 'Unauthorized access', status_code: 401}
        } catch (err) {
            console.error(err)
            return {error: true, message: err.message, status_code: 500}
        }
    }
}

module.exports = AuthenticationController