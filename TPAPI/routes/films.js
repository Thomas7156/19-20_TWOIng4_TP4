var express = require('express');
var router = express.Router();

let films = [{
  id: "1",
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
