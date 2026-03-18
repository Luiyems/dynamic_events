const express = require('express');
const router = express.Router();
const events = require('../data/events.json');

// Obtener todos los eventos
router.get('/', (req, res) => {
  res.json(events);
});

// Filtrar eventos
router.get('/filter', (req, res) => {
  const { category } = req.query;

  const filtered = events.filter(event => 
    event.category.toLowerCase() === category.toLowerCase()
  );

  res.json(filtered);
});

module.exports = router;