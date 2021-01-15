const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const responseNetwork = (responseHttp, error, statusCode,  message, data) => {
	let response = {};
	if(error) response.error = true;
	if(data) response.data = data;

	response.time_stamp = new Date().toISOString();
	response.status_code = statusCode;
	response.message = message;

	return responseHttp.status(statusCode).json(response);
}

const generateToken = (data) => {
	let errors = 0

	if(!data.sub) errors++
	if(!data.name) errors++

	if(errors) {
		throw new Error('Parameter error')
	}

	const token = jwt.sign(data, process.env.JWT_SECRET || '1234', {expiresIn: '24h'})

	return token
}

const validateToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		return decoded
	} catch (err) {
		//console.error()
		throw new Error(err.message)
	}
}

const generatePassword = (plainText) => {
	const saltRounds = 10
	return bcrypt.hashSync(plainText, saltRounds)
}

const validatePassword = (plainText, hash) => {
	return bcrypt.compareSync(plainText, hash)
}

module.exports = {
	responseNetwork,
	generateToken,
	validateToken,
	generatePassword,
	validatePassword,
}