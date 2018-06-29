const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { User, validateUser } = require('../models/user');

router.get('/', async (req, res) => {
	const users = await User.find().sort('name');
	res.send(users);
});

router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		res.send(user);
	} catch (err) {
		return res.status(404).send({ error: 'user with given id doesn\'t exists' });
	}
});

router.post('', async (req, res) => {
	const { error } = validateUser(req.body);
		
	if(error) {
		res.status(400).send({ error: error.details[0].message });
		return;
	}

	try {
		let user = new User({
			name: req.body.name,
			email: req.body.email
		});
		user = await user.save();
		res.send(user);
	} catch(err) {
		return res.status(400).send({ error: err.message });
	}
});

router.put('/:id', async (req, res) => {
	const { error } = validateUser(req.body);
		
	if(error) {
		res.status(400).send({ error: error.details[0].message });
		return;
	}

	try {
		const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email }, {
			new: true
		});

		res.send(user);
	} catch(err) {
		return res.status(404).send({ error: 'user with given id doesn\'t exists' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndRemove(req.params.id);

		res.send({ message: 'user has been deleted.' });
	} catch(err) {
		return res.status(404).send({ error: 'user with given id doesn\'t exists' });
	}
});

module.exports = router;