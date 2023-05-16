const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const api_key = 'YOUR_API_KEY';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/templates/distancia.html'));
});

app.get('/routes', (req, res) => {
  const rua = req.query.rua;
  const num = req.query.num;
  const cidade = req.query.cidade;
  const estado = req.query.estado;
  const rua_d = req.query.rua_d;
  const num_d = req.query.num_d;
  const cidade_d = req.query.cidade_d;
  const estado_d = req.query.estado_d;

  if (rua === undefined || num === undefined || cidade === undefined || estado === undefined) {
    return res.sendFile(path.join(__dirname + '/templates/invalid.html'));
  }

  if (rua_d === undefined || num_d === undefined || cidade_d === undefined || estado_d === undefined) {
    return res.sendFile(path.join(__dirname + '/templates/invalid.html'));
  }

  const origem = `${rua} ${num}, ${cidade} - ${estado}`;
  const destino = `${rua_d} ${num_d}, ${cidade_d} - ${estado_d}`;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origem}&destinations=${destino}&key=${api_key}`;

  fetch(url)
    .then(response => response.text())
    .then(responseText => {
      console.log(responseText);
      const data = JSON.parse(responseText);
      const distancia = data.rows[0].elements[0].distance.text;
      const tempo = data.rows[0].elements[0].duration.text;
      const coordenadas_origem = data.origin_addresses[0];
      const coordenadas_destino = data.destination_addresses[0];

      const google_maps_url = `https://www.google.com/maps/embed/v1/directions?key=${api_key}&origin=${origem}&destination=${destino}`;

      res.render('resultado', {
        distancia: distancia,
        tempo: tempo,
        coordenadas_origem: coordenadas_origem,
        coordenadas_destino: coordenadas_destino,
        google_maps_url: google_maps_url
      });
    })
    .catch(error => {
      console.error(error);
      res.sendFile(path.join(__dirname + '/templates/invalid.html'));
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
