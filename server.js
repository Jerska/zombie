const http = require('http');
const express = require('express');

let state = require('./state.js');

const app = express();

app.set('port', process.env.PORT || 300);

app.use(express.static('public'));

const server = http.createServer(app);

const io = require('socket.io').listen(server);

if (app.get('env') === 'development') {
  const reload = require('reload');
  reload(server, app, true);

  const livereload = require('livereload');
  const lrserver = livereload.createServer();
  lrserver.watch(__dirname + '/public');
}

io.sockets.on('connection', function (socket) {
  console.log('New user connected!');
  let pos = {};

  socket.on('new_player', (nickname) => {
    const x = 0;
    const y = 0;
    const player = {nickname, x, y};
    state.game.players.push(player);
    io.emit('load_player', player);
  });

  socket.on('info', () => {
    io.emit('info_player', pos.x, pos.y);
  });

  socket.broadcast.on('update_player', (x, y) => {
    pos.x = x;
    pos.y = y;
    io.emit('draw_player', x, y);
  });
});


app.get('/constants.js', (req, res) => {
  res.contentType('application/javascript');
  res.send('window.CONSTANTS = ' + JSON.stringify({
    env: app.get('env'),
    state
  }));
});

server.listen(app.get('port'), () => {
  console.info(`Running on http://localhost:${app.get('port')}/`);
});
