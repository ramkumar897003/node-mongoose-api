const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	}
});

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required(),
		description: Joi.string()
	};

	return Joi.validate(course, schema);
}

module.exports = {
	Course: mongoose.model('Course', courseSchema),
	validateCourse: validateCourse
}
