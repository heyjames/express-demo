const config = require('config'); // Setup prod, dev env variables
const helmet = require('helmet'); // ?? Middleware
const debug = require('debug')('app:startup'); // replaces console.log() for debugging
// const dbDebugger = require('debug')('app:db');
const morgan = require('morgan'); // Insert middleware and use next()
const Joi = require('joi');

const courses = require('./routes/courses'); // Structuring Express Applications. When we moved the course routes to another file
// const genres = require('./routes/genres'); // Structuring Express Applications. When we moved the course routes to another file
const home = require('./routes/home'); // Structuring Express Applications. When we moved the course routes to another file

const logger = require('./middleware/logger');  // Middleware: Test console output w/ separate file
const authenticator = require('./authenticator'); // Middleware: Test console output w/ separate file

const express = require('express');
const app = express();

/* Two different ways to access the environmental variable to get the DEV/PROD environment */
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // undefined by default
// console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug'); // Templating Engine: Express will internally load this module
app.set('views', './views'); // Templating Engine: By default. optional. put all your templates inside views
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware: Parses incoming requests w/ URL encoded payloads. Request with body like this: key=value&key=value (traditional approach html form with input fields). This middleware parses this body and populates req.body like a JSON object. Express - Advanced Topics #4-Built-In Middleware
app.use(express.static('public')); // Middleware: To serve static files. CSS, images inside this folder in the same directory called "public" with a readme.txt file. localhost:3000/readme.txt
app.use(helmet()); // ?? Middleware
app.use('/api/courses', courses); // Structuring Express Applications. Moved the get,put,delete,post methods to another folder.
// app.use('/api/genres', genres); // Structuring Express Applications. Moved the get,put,delete,post methods to another folder.
app.use('/', home); // Structuring Express Applications. Moved the index file to its own route file
app.use(logger); // Middleware: Test console output w/ separate file
app.use(authenticator); // Middleware: Test console output w/ separate file


// Configuration config middleware
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));


if (app.get('env') === 'development') {
  app.use(morgan('tiny')); // Logs http requests. Use postman get request and terminal will log output
  debug('Morgan enabled'); // replaces console.log()
}


// Db work...
// dbDebugger('Connected to the database...');


// Routes former location here


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));