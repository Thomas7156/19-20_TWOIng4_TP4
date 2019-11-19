var express = require('express');
var router = express.Router();
var API_KEY_IMG = "http://www.omdbapi.com/?t=inception&apikey=e0f4f716";
var API_KEY = "http://img.omdbapi.com/?t=inception&apikey=e0f4f716"

let films = [{
  id: "0",
  movie: "Terminator",
  yearOfRelease: 1984,
  duration: 120,
  actors: ["Shwarzi", "Acteur 2 lol"],
  poster: "img/imagetropcool.png",
  boxOffice: 74000000,
  rottenTomatoesScore: 0
}];

//Read all using GET
router.get('/', (req, res) => {
  res.status(200).json({ films });
});

//Read one using GET
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const film = _.find(films, ["id", id]);

  res.status(200).json({
    message: 'Film found!',
    films
  });
});

//Add using PUT
router.put('/', (req, res) => {
  const { film } = req.body;
  const id = _.uniqueId();
  films.push({ film, id });

  res.json({
    message: `Just added ${id}`,
    films: { film, id }
  });
});

//Update using POST
router.post('/:id', (req, res) => {
  const id = req.params;
  const { film } = req.body;
  const filmToUpdate = _.find(films, ["id", id]);
  filmToUpdate.film = film;

  res.json({
    message : `Just updated ${id} with ${film}`
  });
});

//Delete using DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  _.remove(films, ["id", id]);

  res.json({
    message: `Just removed ${id}`
  });
});

module.exports = router;
