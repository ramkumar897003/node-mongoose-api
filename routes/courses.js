const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { Course, validateCourse } = require('../models/course');

router.get('/', async (req, res) => {
	const courses = await Course.find().sort('name');
	res.send(courses);
});

router.get('/:id', async (req, res) => {
	try {
		const course = await Course.findById(req.params.id);

		res.send(course);
	} catch (err) {
		return res.status(404).send({ error: 'Course with given id doesn\'t exists' });
	}
});

router.post('', async (req, res) => {
	const { error } = validateCourse(req.body);
		
	if(error) {
		res.status(400).send({ error: error.details[0].message });
		return;
	}

	let course = new Course({
		name: req.body.name,
		description: req.body.description
	});
	course = await course.save();
	res.send(course);
});

router.put('/:id', async (req, res) => {
	const { error } = validateCourse(req.body);
		
	if(error) {
		res.status(400).send({ error: error.details[0].message });
		return;
	}

	try {
		const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description }, {
			new: true
		});

		res.send(course);
	} catch(err) {
		return res.status(404).send({ error: 'Course with given id doesn\'t exists' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const course = await Course.findByIdAndRemove(req.params.id);

		res.send({ message: 'Course has been deleted.' });
	} catch(err) {
		return res.status(404).send({ error: 'Course with given id doesn\'t exists' });
	}
});

module.exports = router;