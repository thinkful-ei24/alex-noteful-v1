'use strict';

const express = require('express');

const data = require('./db/notes');

const app = express();

app.use(express.static('public'));

console.log('Hello Noteful!');

// add static server here
app
  .listen(8080, function() {
    console.info(`Server listening on ${this.address().port}`);
  })
  .on('error', err => {
    console.error(err);
  });

app.get('/api/notes', (req, res) => {
  let { searchTerm } = req.query;
  if (searchTerm) {
    let newArray = data.filter(item => item.title.includes(searchTerm));
    return res.json(newArray);
  }

  res.json(data);
});

app.get('/api/notes/:id', (req, res) => {
  let { id } = req.params;
  let newObj = data.find(item => item.id === Number(id));

  res.json(newObj);
});
