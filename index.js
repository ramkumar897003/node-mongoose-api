const debug = require('debug')('app:startup');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const courses = require('./routes/courses');
const users = require('./routes/users');

mongoose.connect('mongodb://localhost/node-mongoose-api')
.then(() => debug('Connected to mongodb.'))
.catch(err => debug('Could not connect to mongodb.'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);
app.use('/api/users', users);

if(app.get('env') === 'development') {
	app.use(morgan('tiny'));
	debug('dev mode');
}


app.get('/', (req, res) => {
	res.send('Hello World');
});

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});