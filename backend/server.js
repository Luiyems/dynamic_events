const express = require('express');
const cors = require('cors');
const app = express();

const eventRoutes = require('./routes/events');

app.use(cors());
app.use(express.json());

app.use('/events', eventRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});