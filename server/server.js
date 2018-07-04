const path = require('path');
const express = require('express');

const app = express();


app.get('/rest/api/key', (req, res) => (
  setTimeout(() => (
    res.json({ key: Math.floor(Math.random() * 900000) + 100000 })
  ), 3000)
));

app.get('/rest/api/cpu', (req, res) => res.json({ utilization: Math.floor(Math.random() * 100) }));

app.use('/', express.static(path.join(__dirname, '/../dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
