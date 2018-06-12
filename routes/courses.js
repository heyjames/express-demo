const express = require('express');
const router = express.Router();

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'},
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body); // Same as using result.error because the object has 2

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

router.put('/:id', (req, res) => {
  // Look up course
  // If not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found.');
  }

  // Validate
  // If invalid, return 400 - Bad request

  // Commented so we can move it into a function because it's used in 2 places
  // const schema = {
  //   name: Joi.string().min(3).required()
  // };

  // const result = Joi.validate(req.body, schema);

  // Commented so we can use OBJECT DESTRUCTURING to shorten this
  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body); // Same as using result.error because the object has 2

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Update course
  course.name = req.body.name;
  // Return the updated course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}

router.delete('/:id', (req, res) => {
  // Look up course
  // If it doesn't exist, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('The course with the given ID was not found.');
  }

  // Delete
  const index = courses.indexOf(course); // Stores a courses array
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

router.get('/:id', (req, res) => {
  // req.params.id returns a STRING, so we need to parse it into an INT
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given ID was not found.');
  res.send(course);
});

module.exports = router;