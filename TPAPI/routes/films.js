var express = require('express');
var router = express.Router();
var API_KEY = "e0f4f716";
var API_URL = "http://www.omdbapi.com/";
var API_IMG = "http://img.omdbapi.com/";
const axios = require('axios');
const _ = require('lodash');

//Example of request
//"http://img.omdbapi.com/?t=inception&apikey=e0f4f716"

let films = [{
  id: "0",
  Title: "Terminator",
  Year: 1984,
  Runtime: 120,
  Actors: ["Shwarzi", "Acteur 2 lol"],
  Poster: "img/imagetropcool.png",
  BoxOffice: 74000000,
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

  if(film) {
    res.status(200).json({
      message: 'Film found!',
      film
    });
  } else {
    res.status(404).json({
      message: 'Film not found!'
    });
  }
});

//Add using PUT
router.put('/:title', (req, res) => {

  const { title } = req.params;

  axios.get(`${API_URL}?apikey=${API_KEY}&t=${title}`)

  .then((response) => {
    //console.log(response);

    // handle success
    films.push({
      id: response.data.imdbID,
      Title: response.data.Title,
      Year: response.data.Year,
      Runtime: response.data.Runtime,
      Actors: [response.data.Actors],
      Poster: response.data.Poster,
      BoxOffice: response.data.BoxOffice,
      rottenTomatoesScore: response.data.Ratings[1].Value
    });
  })

  .catch((error) => {
    // handle error
    console.log(error);
  })

  .finally(() => {
    // always executed
    res.status(200).json({ films });
  });

});

//Update using POST
router.post('/:id/:title', (req, res) => {
  const id = req.params.id;
  const newTitle = req.params.title;
  //const { film } = req.body;
  const filmToUpdate = _.find(films, ["id", id]);

  axios.get(`${API_URL}?apikey=${API_KEY}&t=${newTitle}`)

  .then((response) => {

    filmToUpdate.Title = response.data.Title;
    filmToUpdate.Year = response.data.Year;
    filmToUpdate.Runtime = response.data.Runtime;
    filmToUpdate.Actors = [response.data.Actors];
    filmToUpdate.Poster = response.data.Poster;
    filmToUpdate.BoxOffice = response.data.BoxOffice;
    filmToUpdate.rottenTomatoesScore = response.data.Ratings[1].Value;
  })

  .catch((error) => {
    // handle error
    console.log(error);
  })

  .finally(() => {
    // always executed
    res.status(200).json({ message : `Just updated ${id} with ${newTitle}`,
      filmToUpdate
    });
  });
});

//Delete using DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  _.remove(films, ["id", id]);

  res.status(200).json({
    message: `Just removed ${id}`,
    films
  });
});

module.exports = router;
