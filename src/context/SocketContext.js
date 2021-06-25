import {createContext, useState, useEffect, useRef} from 'react';
import io from 'socket.io-client';
import {useHistory} from 'react-router-dom';



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
  const [resetmsg, setResetMsg] = useState(null);
  const [playerlost, setPlayerLost] = useState(false);
  const [playerwin, setPlayerWin] = useState(false);
  const [inactiveRoll, setInactiveRoll] = useState(true);
  const [inactiveMsg, setInactiveMsg] = useState("");
  const [fakeplayer, setFakePlayer] = useState({
    player: "Player 1",
    id: "O09aIvQ6mAvYpasGAAAH",
    location: "home",
    roll: 0,
    token: "green",
    cards: [],
  });

  const playerRef = useRef(player);
  const history = useHistory();

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

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


      socket.on('update-players', (players) => {
        console.log('UPDATE PLAYERS - PLAYERS:', players);
        console.log('UPDATE PLAYERS SOCKET ID:', socket.id);
        setPlayers(players);
        const fplayer = players.find((p, i) => {
          if (p.id === socket.id) {
            console.log('P:', p);
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


        
      })
      socket.on('case-file', (casefile) => {
        setCaseFile(casefile);
      });
      socket.on('player-start', (start_player) => {
        setLossMsg(null);
        if (start_player.id === socket.id) {
          console.log('PLAYER START STARTPLAYER:', start_player);
          setActive(true);
          setActiveRoll(true);
        } else {
          setActive(false);
          setActiveRoll(false);
          setInactiveMsg(`Player ${start_player.player} is currently rolling.`);
        }
        history.push('/game');
      });
      socket.on("room-choose", (a_player) => {
        console.log(a_player);
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
        if (card.suspect) {
          setProofMsg(`Player ${player.player} proves beyond a shadow of doubt 
          the ${card.suspect} wasn't involved!`);
        } else if (card.room) {
          setProofMsg(`Player ${player.player} proves beyond a shadow of doubt 
          that it didn't happen in the ${card.room}!`);
        } else if (card.weapon) {
          setProofMsg(`Player ${player.player} proves beyond a shadow of doubt 
          that a ${card.weapon} couldn't have been the murder weapon!`);
        }
        setTimeout(() => {
          setProofMsg(null);
          socket.emit("end-turn", aplayer);
        }, 7000);
      });
      socket.on("player-lost", (data) => {
        const { body } = data;
        setLossMsg(
          `You lost while accusing the ${body.suspect} of murdering Mr. Boddy in the ${body.room} with a ${body.weapon}!`
        );
        setInactiveMsg(
          `Player ${data.player} lost while accusing the ${body.suspect} of murdering Mr. Boddy in the ${body.room} with a ${body.weapon}!`
        );
        setTimeout(() => {
          if (body.id === socket.id) {
            setPlayerLost(true);
            socket.disconnect({ lost: true });
          }
        }, 7000);
      });
      socket.on("game-win", (data) => {
        const { body } = data;
        setInactiveMsg(
          `Player ${body[1].player} accused ${body[0].suspect} of murdering Mr. Boddy in the ${body[0].room} with a ${body[0].weapon}, and WON!`
        );
        setWinMsg(
          `You accused ${body[0].suspect} of murdering Mr. Boddy in the ${body[0].room} with a ${body[0].weapon}, and WON!`
        );
        setTimeout(() => {
          if (body.id !== socket.id) {
            setPlayerLost(true);
          } else {
            setPlayerWin(true);
          }
          setResetMsg(
            `Player ${body[1].player} has won and the game has ended. Please refresh your browser to join a new game.`
          );
          socket.emit("game-reset");
        }, 7000);
      });
      socket.on("suggest-message", (data) => {
        const { activeplayer, body } = data;
        if (playerRef.current.id !== activeplayer.id) {
          setInactiveMsg(
            `Player ${activeplayer.player} is suggesting that the ${body.suspect} killed Mr. Boddy in the ${body.room} with a ${body.weapon}.`
          );
        }
      });
      socket.on("accuse-choice", (player) => {
        if (playerRef.current.id === player.id) {
          setActiveSA(false);
          setActiveAccuse(true);
        } else {
          setInactiveMsg(
            `No one could prove the suggestion wrong. Player ${player.player} is deciding whether or not to make an accusation.`
          );
        }
      });
      socket.on("update-messages", () => {
        setInactiveMsg(null);
      });
    }
  }, [socket]);

  const sayHi = () => {
    socket.emit("say-hi");
  };

  const sendMessage = (message) => {
    socket.emit("send-message", { message });
  };

  const gameStart = () => {
    socket.emit('game-start');
  }

  const sendRoll = (rollvalue) => {
    if (active && activeRoll) {
      socket.emit("send-roll", { id: socket.id, rollvalue: rollvalue });
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
        activeRoll,
        activeRoom,
        fakeplayer,
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
      }}>
      {props.children}
    </SocketContext.Provider>  
  )
}
