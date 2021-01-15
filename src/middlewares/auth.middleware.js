const {
    responseNetwork,
    verifyToken
} = require("../utils/functions")
const ApiKeyModel = require("../models/api-key.model")

const middlewares = {
	isLoggedIn : async (request, response, next) =>{		
		
		var token = request.headers['authorization'] || '';
		
		if(!token) {
			return responseNetwork(
				response,
				true,
				401,
				"Unauthorized access"
			)	
		}
		
		let isValid = false;
		isValid = await verifyToken(token)

		if(isValid) {
			return next();
		}

		return responseNetwork(
			response,
			true,
			401,
			"Unauthorized access"
		)
	},

	checkApiKey: async (request, response, next) => {
		if(!request.headers['authorization']) {
			console.error('Don\'t exists the api key')
			return responseNetwork(
				response,
				true,
				401,
				"Unauthorized access"
			)
		}

		let apiKey = request.headers['authorization']
		apiKey = apiKey.replace("ApiKey ", "")

		const data = await ApiKeyModel.findOne({where: {value: apiKey}})

        if(data){
            return next()
		}
		
		console.error('Don\'t exists the api key in the database')
		return responseNetwork(
			response,
			true,
			401,
			"Unauthorized access"
		)
	}
};

module.exports = middlewares;