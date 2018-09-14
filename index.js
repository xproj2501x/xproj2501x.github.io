let express = require('express');

const APP = express();
const HTTP = require('http').Server(APP);

APP.use(express.static(__dirname));

APP.get('/*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

HTTP.listen(2501, () => {
  console.log('listening on *:2501');
});