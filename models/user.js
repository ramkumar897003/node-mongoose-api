const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	}
});

function validateUser(user) {
	const schema = {
		name: Joi.string().min(3).required(),
		email: Joi.string().required()
	};

	return Joi.validate(user, schema);
}

module.exports = {
	User: mongoose.model('User', userSchema),
	validateUser: validateUser
}
