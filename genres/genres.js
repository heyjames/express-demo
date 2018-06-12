const Joi = require('joi');
const express = require('express');
const router = express().Router();
// route.use(express.json()); // add a piece of middleware to use the req.body

var genres = [
  { id: 1, genreName: 'drama' },
  { id: 2, genreName: 'romance' },
  { id: 3, genreName: 'action' }
];

route.get('/', (req, res) => {
  res.send('Hi, there.');
});

route.get('/', (req, res) => {
  res.send(genres);
});

route.get('/:genreName', (req, res) => {
  const genre = genres.find(c => c.genreName === req.params.genreName);
  if (!genre) return res.status(404).send('Could not find a genre of that name.');
  
  res.send(genre);
});

route.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    genreName: req.body.genreName
  };

  genres.push(genre);
  res.send(genre);
});

route.put('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Could not find a genre of that name.');
  
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.genreName = req.body.genreName;

  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    genreName: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

route.delete('/:genreName', (req, res) => {
  // Look up course, and if it doesn't exist, return 404
  const genre = genres.find(c => c.genreName === req.params.genreName);
  if (!genre) return res.status(404).send('Could not find a genre of that name.');

  // Delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  // Return the deleted genre to the client
  res.send(genre);
});

// const port = process.env.port || 3000;
// route.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = router;