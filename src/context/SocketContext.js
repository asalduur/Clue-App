import { createContext, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [currentRoom, setCurrentRoom] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [player, setPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [active, setActive] = useState(false);
  const [activeRoll, setActiveRoll] = useState(false);
  const [activeRoom, setActiveRoom] = useState(false);
  const [activeSA, setActiveSA] = useState(false);
  const [activeAccuse, setActiveAccuse] = useState(false);
  const [casefile, setCaseFile] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [accusation, setAccusation] = useState(null);
  const [lossmsg, setLossMsg] = useState(null);
  const [winmsg, setWinMsg] = useState(null);
  const [proofmsg, setProofMsg] = useState(null);
  const [myProof, setMyProof] = useState(null);
  const [inactiveProof, setInactiveProof] = useState(null);
  const [resetmsg, setResetMsg] = useState(null);
  const [playerlost, setPlayerLost] = useState(false);
  const [playerwin, setPlayerWin] = useState(false);
  const [inactiveRoll, setInactiveRoll] = useState(true);
  const [inactiveMsg, setInactiveMsg] = useState("");
  const [rolltotal, setRollTotal] = useState(0);
  //Waiting added
  const [waiting, setWaiting] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [gameRooms, setGameRooms] = useState(null);
  const [lastMan, setLastMan] = useState(false);

  const playerRef = useRef(player);
  const playersRef = useRef(players);
  const history = useHistory();

  useEffect(() => {
    playerRef.current = player;
    playersRef.current = players;
  }, [player, players]);

  useEffect(() => {
    if (!socket) {
      setSocket(io.connect());
    }
    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("relay-message", (body) => {
        console.log(body.message);
        setMessages((currentstate) => [...currentstate, body]);
      });
      socket.on("player-disconnected", (msg) => {
        alert(msg);
      });

      socket.on("update-players", (players) => {
        console.log("UPDATE PLAYERS - PLAYERS:", players);
        console.log("UPDATE PLAYERS SOCKET ID:", socket.id);
        setPlayers(players);
        const fplayer = players.find((p, i) => {
          if (p.id === socket.id) {
            console.log("P:", p);
            return p;
          }
        });
        setPlayer(fplayer);
        // setPlayer(() => {
        //   players.forEach((p, i) => {
        //     if (p.id === socket.id) {
        //       console.log('P:', p);
        //       return p;
        //     }
        //   });

        // });
      });
      socket.on("case-file", (casefile) => {
        console.log('CASEFILE:', casefile);
        setCaseFile(casefile);
      });
      socket.on('game-start', (body) => {
        console.log(body);
      });
      socket.on("player-start", (start_player) => {
        setLossMsg(null);
        setProofMsg(null);
        setActiveAccuse(false);
        if (start_player.id === socket.id) {
          setActive(true);
          setActiveRoll(true);
        } else {
          setActive(false);
          setActiveRoll(false);
          setInactiveMsg(`Player ${start_player.player} is currently rolling.`);
        }
        history.push("/game");
      });
      socket.on("room-choose", (a_player) => {
        if (playerRef.current.id === a_player.id) {
          setActiveRoll(false);
          setActiveRoom(true);
        } else {
          setInactiveMsg(
            `Player ${a_player.player} is currently choosing a room.`
          );
        }
      });
      socket.on("accuse-suggest", (a_player) => {
        if (playerRef.current.id === a_player.id) {
          setActiveRoom(false);
          setActiveSA(true);
        } else {
          setInactiveMsg(
            `Player ${a_player.player} is currently making a suggestion or accusation.`
          );
        }
      });
      socket.on("send-proof", (p) => {
        const { aplayer, player, card } = p;

        setSuggestion(null);
        setWaiting(false);
        setInactiveProof(`Player ${player.player} proves the suggestion incorrect!`);
        if (playerRef.current.id === player.id) {
          setMyProof(`I just proved Player ${aplayer.player}'s suggestion incorrect with the ${card.suspect ? card.suspect : ''}
          ${card.room ? card.room : ''}${card.weapon ? card.weapon : ''}.`);
        }
        if (card.suspect) {
          console.log('SUSPECT PROOF')
          setProofMsg(`Player ${player.player} proves beyond a shadow of doubt 
          the ${card.suspect} wasn't involved!`);
        } else if (card.room) {
          console.log('ROOM PROOF')
          setProofMsg(`Player ${player.player} proves beyond a shadow of doubt 
          that it didn't happen in the ${card.room}!`);
        } else if (card.weapon) {
          console.log('WEAPON PROOF')
          setProofMsg(`Player ${player.player} proves beyond a shadow of doubt 
          that a ${card.weapon} couldn't have been the murder weapon!`);
        }
        if (aplayer.id === player.id) {
          setActiveSA(false);
          // setWaiting(false);
          
        }
        setTimeout(() => {
          setInactiveProof(false);
          setMyProof(null);
          setInactiveProof(null);
          setProofMsg(null);
          setWaiting(false);
          socket.emit("end-turn", aplayer);
        }, 7000);
      });
      socket.on("player-lost", (data) => {
        const { body } = data;
        setInactiveMsg(
          `Player ${data.player} lost while accusing the ${body.suspect} of murdering Mr. Boddy in the ${body.room} with a ${body.weapon}!`
        );
        if (body.id === socket.id) {
          setLossMsg(
            `You lost while accusing the ${body.suspect} of murdering Mr. Boddy in the ${body.room} with a ${body.weapon}!`
          );
          setPlayerLost(true);
          setActiveSA(false);
          setActiveAccuse(false);
        }
        setTimeout(() => {
          if (body.id === socket.id) {
            setLossMsg(null);
            // setActiveSA(false);

            socket.emit('player-lose', data);

            // socket.disconnect({ lost: true, win: false });
          }
        }, 7000);
      });
      socket.on("game-win", (data) => {
        const { body, player } = data;
        if (playerRef.current.id !== body.id) {
        setInactiveMsg(
          `Player ${player} accused the ${body.suspect} of murdering Mr. Boddy in the ${body.room} with a ${body.weapon}, and WON!`
        );
        } else {
        setActiveSA(false);
        setActiveAccuse(false);
        setWinMsg(
          `You accused the ${body.suspect} of murdering Mr. Boddy in the ${body.room} with a ${body.weapon}, and WON!`
        );
        }
        
        setTimeout(() => {
          if (body.id !== socket.id) {
            setPlayerLost(true);
          } else {
            setPlayerWin(true);
          }
          setResetMsg(
            `Player ${player} has won and the game has ended. Please refresh your browser to join a new game.`
          );
          setWinMsg(null);
          socket.emit("game-win-reset");
          // socket.disconnect({ lost: false, won: true });
          setTimeout(() => {history.push('/')}, 1000)
        }, 7000);
      });
      socket.on("suggest-message", (data) => {
        const { activeplayer, body } = data;
        if (playerRef.current.id !== activeplayer.id) {
          setInactiveMsg(
            `Player ${activeplayer.player} is suggesting that the ${body.suspect} killed Mr. Boddy in the ${body.room} with a ${body.weapon}.`
          );
        } else {
          setWaiting(true);
        }
        // if (playerRef.current.id === activeplayer.id) {
        //   setActiveSA(false);
        // }
      });
      socket.on("accuse-choice", (player) => {
        if (playerRef.current.id === player.id) {
          setActiveSA(false);
          setWaiting(false);
          setActiveAccuse(true);
        } else {
          setInactiveMsg(
            `No one could prove the suggestion wrong. Player ${player.player} is deciding whether or not to make an accusation.`
          );
        }
      });
      socket.on('last-man-standing', (body) => {
        if (body.id !== playerRef.current.id) {
          setLastMan(true);
        }
      })
      socket.on("update-messages", () => {
        setInactiveMsg(null);
      });
      socket.on("send-roll-total", (aplayer) => {
        if (playerRef.current.id === aplayer.id) {
          setRollTotal(aplayer.roll);
        }
      });
      socket.on('room-join-info', (body) => {
        console.log('ROOMJOININFOBODY:', body);
        setGameRooms(body);
        // console.log('GAMEROOMS:', body);
      });
      socket.on('player-disconnect', (body) => {
        if (body.id) {
        if (playerRef.current.id === body.id) {
            history.push('/');
            socket.disconnect();
            setRoomId('');
            socket.connect();
          }
        }
        if (body.gamewon) {
        socket.disconnect();
        setRoomId('');
        socket.connect();
        }
      })
    }
  }, [socket]);

  const sayHi = () => {
    socket.emit("say-hi");
  };

  const sendMessage = (message) => {
    socket.emit("send-message", { message });
  };

  const gameStart = () => {
    socket.emit("game-start");
  };

  const sendRoll = (rollvalue) => {
    if (active && activeRoll) {
      socket.emit("send-roll", {id: socket.id, rollvalue: rollvalue });
    }
  };

  const sendRoom = (room) => {
    if (active && activeRoom) {
      socket.emit("send-location", { id: socket.id, location: room });
    }
  };

  const sendSuggest = (room, weapon, suspect) => {
    if (active && activeSA) {
      socket.emit("send-suggestion", { id: socket.id, room, weapon, suspect });
    }
  };

  const sendAccusation = (room, weapon, suspect) => {
    if ((active && activeSA) || (active && activeAccuse)) {
      setSuggestion(null);
      socket.emit("send-accusation", { id: socket.id, room, weapon, suspect });
    }
  };

  const joinRoom = (roomid) => {
    // if (!roomId) {
    setRoomId(roomid);
    socket.emit('join-room', {roomid, id: socket.id});
    
  }

  const endTurn = () => {
    socket.emit("end-turn", { id: socket.id });
  };

  return (
    <SocketContext.Provider
      value={{
        sayHi,
        sendMessage,
        messages,
        gameStart,
        sendRoll,
        player,
        active,
        activeSA,
        activeAccuse,
        activeRoll,
        activeRoom,
        currentRoom,
        setCurrentRoom,
        inactiveMsg,
        sendRoom,
        sendSuggest,
        endTurn,
        sendAccusation,
        lossmsg,
        winmsg,
        suggestion,
        proofmsg,
        players,
        rolltotal,
        waiting,
        setWaiting,
        resetmsg,
        inactiveProof,
        setInactiveProof,
        myProof,
        gameRooms,
        joinRoom,
        roomId
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
