require("dotenv").config();
const express = require("express");
const app = express();
const { SERVER_PORT } = process.env;

let players = [];
let tokens = ["blue", "red", "green", "yellow", 'purple', 'orange'];
let playerturn = 0;
let case_file = {};
let gamerooms = [{roomNum: 1, roomId: '32hd72grf3g', 
                  roomPlayers: [], roomCards: [], active: false}, 
                 {roomNum: 2, roomId: '98hf43jhf48', 
                  roomPlayers: [], roomCards: [], active: false},
                  {roomNum: 3, roomId: '83hdkb8dk3m', 
                  roomPlayers: [], roomCards: [], active: false},
                  {roomNum: 4, roomId: '39dj74hdl3j', 
                  roomPlayers: [], roomCards: [], active: false},
                  {roomNum: 5, roomId: '61hdk90d020', 
                  roomPlayers: [], roomCards: [], active: false},    
                ];

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
const getOtherPlayers = (body, room) => {
  let roomindex = gamerooms.findIndex((r, i) => {
    return r.roomId === room;
  });
  let index = gamerooms[roomindex].roomPlayers.findIndex((p, i) => {
    return p.id === body.id;
  });
  const firstplayers = [...gamerooms[roomindex].roomPlayers.slice(index + 1)];
  const lastplayers = [...gamerooms[roomindex].roomPlayers.slice(0, index)];
  const orderplayers = [...firstplayers, ...lastplayers];
  return orderplayers;
};
const getActivePlayer = (body, room) => {
  let roomindex = gamerooms.findIndex((r, i) => {
    return r.roomId === room;
  });
  let aplayer = {};
  gamerooms[roomindex].roomPlayers.forEach((p, i) => {
    if (p.id === body.id) {
      aplayer = p;
    }
  });
  return aplayer;
};

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected.`);
  io.emit('room-join-info', gamerooms);
  let gameroom = null;
  let roomplayers = [];
  let playerscards = [];
  players.push({
    player: 0,
    id: socket.id,
    roll: 0,
    location: 'home',
    cards: []
  });
  io.to(gameroom).emit("update-players", players);
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);

    if (gameroom) {
      const roomindex = gamerooms.findIndex((r, i) => {
        return r.roomId === gameroom;
      });

      const playerindex = gamerooms[roomindex].roomPlayers.findIndex((p, i) => {
        return p.id === socket.id;
      })
    
    

      if(playerindex !== -1 && gamerooms[roomindex].roomPlayers.length < 3) {
        io.to(gameroom).emit('last-man-standing', {id: socket.id});
        setTimeout(() => {
          gamerooms[roomindex].roomPlayers = [];
          gamerooms[roomindex].active = false;
          gamerooms[roomindex].roomCards = [];
          io.emit('room-join-info', gamerooms);
          io.to(gameroom).emit('player-disconnect', {gamewon: true});
        }, 5000)
      }

      if (playerindex !== -1 && gamerooms[roomindex].roomPlayers.length > 2) {
        const firstplayers = [...gamerooms[roomindex].roomPlayers.slice(playerindex + 1)];
        const lastplayers = [...gamerooms[roomindex].roomPlayers.slice(0, playerindex)];
        const orderedplayers = [...firstplayers, ...lastplayers];

      gamerooms[roomindex].roomPlayers.splice(playerindex, 1);
      io.emit('room-join-info', gamerooms);
      io.to(gameroom).emit("update-players", gamerooms[roomindex].roomPlayers);
      io.to(gameroom).emit("player-start", orderedplayers[0]);
    }


  };
  });
  socket.on("game-win-reset", (body) => {
    let roomindex = gamerooms.findIndex((r, i) => {
      return r.roomId === gameroom;
    });
    gamerooms[roomindex].roomPlayers = [];
    gamerooms[roomindex].active = false;
    gamerooms[roomindex].roomCards = [];
    io.emit('room-join-info', gamerooms);
    io.to(gameroom).emit('player-disconnect', {gamewon: true});
  });
  socket.on('player-lose', (data) => {
    if (gameroom) {
      let roomindex = gamerooms.findIndex((r, i) => {
        return r.roomId === gameroom;
      });
      let playerindex = gamerooms[roomindex].roomPlayers.findIndex((p, i) => {
        return p.id === data.body.id;
      });
      if (gamerooms[roomindex].roomPlayers.length > 2) {
        const firstplayers = [...gamerooms[roomindex].roomPlayers.slice(playerindex + 1)];
        const lastplayers = [...gamerooms[roomindex].roomPlayers.slice(0, playerindex)];
        const orderedplayers = [...firstplayers, ...lastplayers];
        
        gamerooms[roomindex].roomPlayers.splice(playerindex, 1);
        io.to(gameroom).emit('player-disconnect', data.body);
        io.to(gameroom).emit("update-players", gamerooms[roomindex].roomPlayers);
        io.to(gameroom).emit("player-start", orderedplayers[0]);
        io.emit('room-join-info', gamerooms);


      } else if (gamerooms[roomindex].roomPlayers.length < 3) {
        io.to(gameroom).emit('last-man-standing', data.body);
        setTimeout(() => {
          gamerooms[roomindex].roomPlayers = [];
          gamerooms[roomindex].active = false;
          gamerooms[roomindex].roomCards = [];
          io.emit('room-join-info', gamerooms);
          io.to(gameroom).emit('player-disconnect', {gamewon: true});
        }, 5000)
      }
    }
  })
  socket.on("send-message", (body) => {
    io.to(gameroom).emit("relay-message", body);
  });
  socket.on("game-start", async (body) => {
    let roomindex = gamerooms.findIndex((r, i) => {
      return r.roomId === gameroom;
    });
    gamerooms[roomindex].active = true;
    let tokenscopy = [...tokens];
    tokenscopy.sort(function () {
      return 0.5 - Math.random();
    });
    gamerooms[roomindex].roomPlayers.forEach((p, i) => {
      p.player = i + 1;
      p.token = tokenscopy.splice(0, 1);

    })

    if (gamerooms[roomindex].roomPlayers.length >= 3) {
      let playercopy = [...gamerooms[roomindex].roomPlayers];
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
      let cardArray = [...weaponArr, ...roomArr, ...peopleArr];

      cardArray.sort(function () {
        return 0.5 - Math.random();
      });
      while (cardArray.length > 0) {
        for (let i = 0; i < gamerooms[roomindex].roomPlayers.length; i++) {
          let card = cardArray.splice(0, 1);
          if (card[0]) {
          switch (i) {
            case 0:
              gamerooms[roomindex].roomPlayers[0].cards.push(card[0]);
              break;
            case 1:
              gamerooms[roomindex].roomPlayers[1].cards.push(card[0]);
              break;
            case 2:
              gamerooms[roomindex].roomPlayers[2].cards.push(card[0]);
              break;
            case 3:
              gamerooms[roomindex].roomPlayers[3].cards.push(card[0]);
              break;
            case 4:
              gamerooms[roomindex].roomPlayers[4].cards.push(card[0]);
              break;
            case 5:
              gamerooms[roomindex].roomPlayers[5].cards.push(card[0]);
              break;
            default:
              null;
              break;
          }
        }
        }
      }
      gamerooms[roomindex].roomCards = [...gamerooms[roomindex].roomPlayers];
      io.emit('room-join-info', gamerooms);
      io.to(gameroom).emit("update-players", gamerooms[roomindex].roomPlayers);
      io.to(gameroom).emit("case-file", case_file);
      io.to(gameroom).emit("player-start", playercopy[playerturn]);
    };
  });

  socket.on("send-roll", (body) => {

    let roomindex = gamerooms.findIndex((r, i) => {
      return r.roomId === gameroom;
    });
    gamerooms[roomindex].roomPlayers.forEach((p, i) => {
      if (p.id === body.id) {
        p.roll += body.rollvalue;
        io.to(gameroom).emit("send-roll-total", p);
      }
    });
    io.to(gameroom).emit("update-players", gamerooms[roomindex].roomPlayers);
    gamerooms[roomindex].roomPlayers.forEach((p, i) => {
      if (p.id === body.id) {
        if (p.roll >= 2) {
          io.to(gameroom).emit("room-choose", p);
          p.roll = 0;
          socket.emit("send-roll-total", p);
        } else {
          const orderedplayers = getOtherPlayers(body, gameroom);
          io.to(gameroom).emit("player-start", orderedplayers[0]);
        }
      }
    });
  });

  socket.on("send-location", (body) => {
    const activeplayer = getActivePlayer(body, gameroom);
    let roomindex = gamerooms.findIndex((r, i) => {
      return r.roomId === gameroom;
    });
    gamerooms[roomindex].roomPlayers.forEach((p, i) => {
      if (body.id === p.id) {
        p.location = body.location;
      }
    });
    io.to(gameroom).emit("update-players", gamerooms[roomindex].roomPlayers);
    io.to(gameroom).emit("accuse-suggest", activeplayer);
  });

  socket.on("send-suggestion", (body) => {
    const activeplayer = getActivePlayer(body, gameroom);
    io.to(gameroom).emit("suggest-message", { activeplayer, body });
    let roomindex = gamerooms.findIndex((r, i) => {
      return r.roomId === gameroom;
    });

    let index = gamerooms[roomindex].roomCards.findIndex((p, i) => {
      return p.id === body.id;
    });
    const firstplayers = [...gamerooms[roomindex].roomCards.slice(index + 1)];
    const lastplayers = [...gamerooms[roomindex].roomCards.slice(0, index)];
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
        io.to(gameroom).emit("send-proof", othercard);
      }, 7000);
    } else {
      setTimeout(() => {
        io.to(gameroom).emit("accuse-choice", activeplayer);
      }, 7000);
    }
  });

  socket.on("suggest-finished", (player) => {
    const orderedplayers = getOtherPlayers(body, gameroom);
    io.to(gameroom).emit("player-start", orderedplayers[0]);
  });

  socket.on("send-accusation", (body) => {
    const activeplayer = getActivePlayer(body, gameroom);
    if (
      body.room === case_file.room &&
      body.weapon === case_file.weapon &&
      body.suspect === case_file.suspect
    ) {
      io.to(gameroom).emit("game-win", { body, player: activeplayer.player });
    } else {
      io.to(gameroom).emit("player-lost", { body, player: activeplayer.player });
    }
  });
  socket.on("end-turn", (body) => {
    io.to(gameroom).emit("update-messages");
    const orderedplayers = getOtherPlayers(body, gameroom);
    io.to(gameroom).emit("player-start", orderedplayers[0]);
  });

  socket.on('join-room', (body) => {
    gameroom = body.roomid;
    let currentplayer = {};
    players.forEach((p, i) => {
    if (p.id === body.id) {
      currentplayer = p;
      players.splice(i, 1);
    }
    });
    if (!currentplayer.player) {
      gamerooms.forEach((r, j) => {
       for (let i = 0; i < r.roomPlayers.length;i++) {
         if (r.roomPlayers[i].id === body.id) {
           currentplayer = r.roomPlayers[i];
         }
       }
      })
    };
    currentplayer.gameRoomId = gameroom;
    gamerooms.forEach((room, i) => {
      let index = room.roomPlayers.findIndex((p, i) => {
        return p.id === body.id;
      })
      if (index !== -1) {
        room.roomPlayers.splice(index, 1);
      }
    });

    gamerooms.forEach((room, i) => {
      if (room.roomId === body.roomid) {
        room.roomPlayers.push(currentplayer)
      }
    });
    io.emit('room-join-info', gamerooms);
    socket.join(body.roomid);
  })
});
