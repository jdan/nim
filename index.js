var net = require('net');
var Nim = require('./nim');

// Amounts in each pile...
var AMOUNT_MIN = 1;
var AMOUNT_MAX = 10;

// Number of piles
var PILE_MIN = 2;
var PILE_MAX = 5;

var players = [];
var game;

/**
 * Generates a random nim game
 */
function randomGame() {
  var i;
  var piles = new Array(Math.floor(Math.random() * (PILE_MAX - PILE_MIN)) + PILE_MIN);

  for (i = 0; i < piles.length; i++) {
    piles[i] = Math.floor(Math.random() * (AMOUNT_MAX - AMOUNT_MIN)) + AMOUNT_MIN;
  }

  return new Nim(piles);
}

/**
 * Broadcasts a message to an array of sockets
 */
function broadcast(clients, message, index) {
  var i;
  if (index === undefined) index = -1;

  for (i = 0; i < clients.length; i++) {
    if (i !== index) {
      clients[i].write(message);
    }
  }
}

net.createServer(function (client) {
  if (players.length == 2) {
    client.end('This room is full!\n');
    return;
  }

  client.index = players.length;
  players.push(client);

  if (players.length < 2) {
    client.write('Waiting for one more...\n');
  } else {
    game = randomGame();
    broadcast(players, 'Welcome!\n');
    broadcast(players, 'The current state is:\n' + game + '\n');
    broadcast(players, 'It\'s your turn!\n> ', +!+game.turn);
  }

  client.on('data', function (msg) {
    msg = msg.toString();
    move = msg.split(' ');

    if (client.index !== game.turn) {
      client.write('It\'s not your turn!\n');
      return;
    }

    var result = game.move.apply(game, move);

    if (game.winner !== null) {
      broadcast(players, 'You win!\n', game.turn);
      broadcast(players, 'You lose!\n', +!+game.turn);

      for (var i = 0; i < players.length; i++) {
        players[i].end();
      }
    } else {
      if (result === -1) {
        client.write('> ');
      } else {
        broadcast(players, 'The current state is:\n' + game + '\n');
        broadcast(players, 'It\'s your turn!\n> ', +!+game.turn);
      }
    }
  });

}).listen(8080, function () {
  console.log('Starting game server...');
});
