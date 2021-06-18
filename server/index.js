require('dotenv').config();
const express = require('express');
const app = express();
const {SERVER_PORT} = process.env;

let players = [];
let tokens = ['blue', 'red', 'green', 'yellow'];
let playerturn = 0;
let playerArray = [];

const cards = [[
    {weapon: 'IcePick'}, {weapon: 'Shank'}, {weapon: 'Coat Hanger'}, 
    {weapon: 'Arsenic'}, {weapon: 'Blowtorch'}, {weapon: 'Ninja Star'}],
  [
    {room: 'Grotto'}, {room: 'Pool-House'}, {room: 'Library'}, {room: 'Kitchen'}, 
    {room: 'Basement'}, {room: 'Wine Cellar'}, {room: 'Foyer'}, {room: 'Garden'}, 
    {room: 'Master Bedroom'}],
  [
    {suspect: 'Butler'}, {suspect: 'Nanny'}, {suspect: 'Doctor'}, 
    {suspect: 'Nosy-Neighbor'}, {suspect: 'Chef'}, {suspect: 'Baby'}]
];

app.use(express.json());


const io = require('socket.io')(app.listen(SERVER_PORT, () => console.log('Server listening on ' + SERVER_PORT)), {cors: {origin: true}});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected.`);
  tokens.sort(function() { return 0.5 - Math.random() });
  switch (players.length) {
    case 0:
      players.push({player: 'Player 1', id: socket.id, location: 'home', 
                    roll: 0, token: tokens.splice(0, 1)[0]});
      break;
    case 1:
      players.push({player: 'Player 2', id: socket.id, location: 'home', 
                    roll: 0, token: tokens.splice(0, 1)[0]});
      break;
    case 3:
      players.push({player: 'Player 3', id: socket.id, location: 'home', 
                    roll: 0, token: tokens.splice(0, 1)[0]});
      break;
    case 4:
      players.push({player: 'Player 4', id: socket.id, location: 'home', 
                    roll: 0, token: tokens.splice(0, 1)[0]});
      break;
    default:
      socket.emit('Max players reached.');
      socket.disconnect();
  }
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
    io.emit('player-disconnected', 'A player disconnected and the game has ended.');
    io.disconnectSockets();
    players = [];
  });
  socket.on('say-hi', () => {
    console.log('hello world');
  });
  socket.on('send-message', (body) => {
    console.log(body);
    io.emit('relay-message', body);
  });
  socket.on('game-start', async () => {

    players.forEach((e, i) => {
      switch (i) {
        case 0:
 
          players[0].cards = [];
          break;
        case 1:
          players[1].cards = [];
          break;
        case 2:
          players[2].cards = [];
          break;
        case 3:
          players[3].cards = [];
          break;
        default:
          null;
      }
    }) 
    players.sort(function() { return 0.5 - Math.random() });

    let weaponArr = [...cards[0]];
    let roomArr = [...cards[1]];
    let peopleArr = [...cards[2]];
    const murder_weapon = weaponArr.splice(Math.floor(Math.random() * weaponArr.length - 1), 1);
    let murder_perp = peopleArr.splice(Math.floor(Math.random() * peopleArr.length - 1), 1);
    let murder_room = roomArr.splice(Math.floor(Math.random() * roomArr.length - 1), 1);
    let case_file = [murder_weapon, murder_perp, murder_room];
    console.log(case_file);
    let cardArray = [...weaponArr, ...roomArr, ...peopleArr];

    cardArray.sort(function() { return 0.5 - Math.random() });
    while (cardArray.length > 0) {
      for (let i = 0; i < players.length; i++) {
        let card = cardArray.splice(0, 1);
        switch (i) {
          case 0:
            players[0].cards.push(card[0]);
            break;
          case 1:
            players[1].cards.push(card[0]);
            break;
          case 2:
            players[2].cards.push(card[0]);
            break;
          case 3:
            players[3].cards.push(card[0]);
            break;
          default:
            null;
            break;
        }

      }
    }

    console.log(players);

    io.emit('update-players', players);





    io.emit('player-start', players[playerturn]);

  });

  socket.on('send-roll', (body) => {
    players.forEach((p, i) => {
      if (p.id === body.id) {
        p.roll += body.rollvalue;
      }
      // if (p.roll > 20) {
      //   io.emit('room-choose', p);
      //   // e.roll = 0;
      // }
    });
    io.emit('update-players', players);
    players.forEach((p, i) => {
      if (p.roll > 20) {
        io.emit('room-choose', p);

        // e.roll = 0;
      }
    })
  })

  socket.on('send-location', (body) => {
    playerArray.forEach((p, i) => {
      if (p.id === body.id) {
        p.location = body.location
      }
    })
    io.emit('update-players', players);
    io.emit('accuse-suggest', body.id);
  })
  
  // console.log(players);
})






//minimum players to start game



