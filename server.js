'use strict';
const { PORT } = require('./config');

const express = require('express');

const data = require('./db/notes');

const { requestLogger } = require('./middleware/logger');

const app = express();

app.use(express.static('public'));

app.use(requestLogger);

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

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app
  .listen(PORT, function() {
    console.info(`Server listening on ${this.address().port}`);
  })
  .on('error', err => {
    console.error(err);
  });
