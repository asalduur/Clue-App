require("dotenv").config();
const express = require("express");
const app = express();
const { SERVER_PORT } = process.env;

let players = [];
let tokens = ["blue", "red", "green", "yellow", 'purple', 'orange'];
let playerturn = 0;
let case_file = {};
let gamerooms = [{roomId: '32hd72grf3g', roomPlayers: []}, 
                 {roomId: '98hf43jhf48', roomPlayers: []}];
let playerscards = [];

const cards = [
  [
    { weapon: "Poisoned Cocktail" },
    { weapon: "Shank" },
    { weapon: "Coat Hanger" },
    { weapon: "Chainsaw" },
    { weapon: "Blowtorch" },
    { weapon: "Ninja Star" },
  ],
  [
    { room: "Grotto" },
    { room: "Pool-House" },
    { room: "Library" },
    { room: "Kitchen" },
    { room: "Basement" },
    { room: "Wine-Cellar" },
    { room: "Foyer" },
    { room: "Garden" },
    { room: "Master-Bedroom" },
  ],
  [
    { suspect: "Butler" },
    { suspect: "Nanny" },
    { suspect: "Doctor" },
    { suspect: "Nosy-Neighbor" },
    { suspect: "Chef" },
    { suspect: "Baby" },
  ],
];

app.use(express.json());

const io = require("socket.io")(
  app.listen(SERVER_PORT, () =>
    console.log("Server listening on " + SERVER_PORT)
  ),
  { cors: { origin: true } }
);

const getOtherPlayers = (body) => {
  let index = players.findIndex((p, i) => {
    return p.id === body.id;
  });
  const firstplayers = [...players.slice(index + 1)];
  const lastplayers = [...players.slice(0, index)];
  const orderplayers = [...firstplayers, ...lastplayers];
  return orderplayers;
};

const getActivePlayer = (body) => {
  let aplayer = {};
  players.forEach((p, i) => {
    if (p.id === body.id) {
      aplayer = p;
    }
  });
  return aplayer;
};

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected.`);
  tokens.sort(function () {
    return 0.5 - Math.random();
  });
  console.log(tokens);
  switch (players.length) {
    case 0:
      players.push({
        player: 1,
        id: socket.id,
        location: "home",
        roll: 0,
        token: tokens.splice(0, 1),
      });
      break;
    case 1:
      players.push({
        player: 2,
        id: socket.id,
        location: "home",
        roll: 0,
        token: tokens.splice(0, 1),
      });
      break;
    case 2:
      players.push({
        player: 3,
        id: socket.id,
        location: "home",
        roll: 0,
        token: tokens.splice(0, 1),
      });
      break;
    case 3:
      players.push({
        player: 4,
        id: socket.id,
        location: "home",
        roll: 0,
        token: tokens.splice(0, 1),
      });
      break;
      case 4:
        players.push({
          player: 5,
          id: socket.id,
          location: "home",
          roll: 0,
          token: tokens.splice(0, 1),
        });
        break;
        case 5:
          players.push({
            player: 6,
            id: socket.id,
            location: "home",
            roll: 0,
            token: tokens.splice(0, 1),
          });
          break;
    default:
      socket.emit("Max players reached.");
      socket.disconnect();
  }
  io.emit("update-players", players);
  socket.on("disconnect", (body) => {
    console.log(`Socket ${socket.id} disconnected.`);

    if (players.length >= 3) {
      let index = players.findIndex((p, i) => {
        return p.id === socket.id;
      });
      const firstplayers = [...players.slice(index + 1)];
      const lastplayers = [...players.slice(0, index)];
      const orderedplayers = [...firstplayers, ...lastplayers];
      console.log(orderedplayers);
      players.splice(index, 1);
      console.log("PLAYERSFROMINDEX:", players);
      io.emit("update-players", players);
      io.emit("player-start", orderedplayers[0]);
    } else if (body.lost) {
      io.emit("This game has ended. Please refresh to start a new game!");
      io.disconnectSockets();
      players = [];
      tokens = ["blue", "red", "green", "yellow", 'purple', 'orange'];
    } else {
      io.emit(
        "player-disconnected",
        "A player disconnected and the game has ended. Please refresh to start a new game."
      );
      io.disconnectSockets();
      players = [];
      tokens = ["blue", "red", "green", "yellow", 'purple', 'orange'];
    }
  });
  socket.on("game reset", () => {
    io.disconnectSockets();
    players = [];
    tokens = ["blue", "red", "green", "yellow", 'purple', 'orange'];
  });
  socket.on("send-message", (body) => {
    console.log(body);
    io.emit("relay-message", body);
  });
  socket.on("game-start", async () => {
    if (players.length >= 3) {
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
          case 4:
            players[4].cards = [];
            break;
          case 5:
            players[5].cards = [];
            break;
          default:
            null;
        }
      });
      let playercopy = [...players];
      playercopy.sort(function () {
        return 0.5 - Math.random();
      });

      let weaponArr = [...cards[0]];
      let roomArr = [...cards[1]];
      let peopleArr = [...cards[2]];
      const [murder_weapon] = weaponArr.splice(
        Math.floor(Math.random() * weaponArr.length),
        1
      );
      const [murder_perp] = peopleArr.splice(
        Math.floor(Math.random() * peopleArr.length),
        1
      );
      const [murder_room] = roomArr.splice(
        Math.floor(Math.random() * roomArr.length),
        1
      );
      case_file = { ...murder_weapon, ...murder_perp, ...murder_room };
      console.log('CASE_FILE:', case_file);
      let cardArray = [...weaponArr, ...roomArr, ...peopleArr];
      console.log('CARDARRAY:', cardArray);

      cardArray.sort(function () {
        return 0.5 - Math.random();
      });
      while (cardArray.length > 0) {
        for (let i = 0; i < players.length; i++) {
          let card = cardArray.splice(0, 1);
          console.log('CARDBEINGDEALT:', card[0]);
          if (card[0]) {
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
            case 4:
              players[4].cards.push(card[0]);
              break;
            case 5:
              players[5].cards.push(card[0]);
              break;
            default:
              null;
              break;
          }
        }
        }
      }
      console.log('PLAYERSAFTERCARDSDEALT:', players);
      playerscards = [...players];
      io.emit("update-players", players);
      io.emit("case-file", case_file);
      io.emit("player-start", playercopy[playerturn]);
    } else {
      io.emit("more-players"); // FINISH THIS HERE -- currently handled on front end --
      // start button only shows if there are enough players.
    }
  });

  socket.on("send-roll", (body) => {
    players.forEach((p, i) => {
      if (p.id === body.id) {
        p.roll += body.rollvalue;
        io.emit("send-roll-total", p);
      }
    });
    io.emit("update-players", players);
    players.forEach((p, i) => {
      if (p.id === body.id) {
        if (p.roll >= 2) {
          io.emit("room-choose", p);
          p.roll = 0;
          socket.emit("send-roll-total", p);
        } else {
          const orderedplayers = getOtherPlayers(body);
          io.emit("player-start", orderedplayers[0]);
        }
      }
    });
  });

  socket.on("send-location", (body) => {
    const activeplayer = getActivePlayer(body);
    //ADD CODE TO UPDATE PLAYER LOCATION ON BACKEND.
    io.emit("update-players", players);
    io.emit("accuse-suggest", activeplayer);
  });

  socket.on("send-suggestion", (body) => {
    const activeplayer = getActivePlayer(body);
    io.emit("suggest-message", { activeplayer, body });
    // const orderedplayers = getOtherPlayers(body);

    let index = playerscards.findIndex((p, i) => {
      return p.id === body.id;
    });
    const firstplayers = [...players.slice(index + 1)];
    const lastplayers = [...players.slice(0, index)];
    const orderedplayers = [...firstplayers, ...lastplayers];
    
    let othercards = [];
    orderedplayers.forEach((player, i) => {
      player.cards.forEach((card, i) => {
        for (const prop in card) {
          if (body[prop]) {
            if (card[prop] === body[prop]) {
              othercards.push({ player, card });
            }
          }
        }
      });
    });
    othercards.sort(function () {
      return 0.5 - Math.random();
    });
    let othercard = othercards[0];
    if (othercard) {
      othercard.aplayer = activeplayer;
      setTimeout(() => {
        io.emit("send-proof", othercard);
      }, 7000);
      // io.emit('send-proof', othercards[0]);
    } else {
      setTimeout(() => {
        io.emit("accuse-choice", activeplayer);
      }, 7000);
    }
  });

  socket.on("suggest-finished", (player) => {
    const orderedplayers = getOtherPlayers(body);
    io.emit("player-start", orderedplayers[0]);
  });

  socket.on("send-accusation", (body) => {
    const activeplayer = getActivePlayer(body);
    // const otherplayers = getOtherPlayers(body);
    console.log('ACCUSATION CASE_FILE:', case_file);
    if (
      body.room === case_file.room &&
      body.weapon === case_file.weapon &&
      body.suspect === case_file.suspect
    ) {
      io.emit("game-win", { body, player: activeplayer.player });
    } else {
      io.emit("player-lost", { body, player: activeplayer.player });
    }
  });
  socket.on("end-turn", (body) => {
    io.emit("update-messages");
    const orderedplayers = getOtherPlayers(body);
    io.emit("player-start", orderedplayers[0]);
  });

  socket.on('join-room', (body) => {
    gamerooms.forEach((room, i) => {
      if (room.Id === body.roomId) {
        room.roomPlayers.push(body.playerId);
      }
    })
    socket.join(body.roomId);
  })
});
