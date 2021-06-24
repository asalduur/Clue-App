import { createContext, useState, useEffect, useCallback, useRef } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [player, setPlayer] = useState(null);
  const [active, setActive] = useState(false);
  const [activeRoll, setActiveRoll] = useState(false);
  const [activeRoom, setActiveRoom] = useState(false);
  const [inactiveRoll, setInactiveRoll] = useState(true);
  const [inactiveMsg, setInactiveMsg] = useState("");
  const [fakeplayer, setFakePlayer] = useState({
    player: "Player 1",
    id: "O09aIvQ6mAvYpasGAAAH",
    location: "foyer",
    roll: 0,
    token: "green",
    cards: [],
  });
  const [currentRoom, setCurrentRoom] = useState("foyer");

  const playerRef = useRef(player);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  let vplayer = {};
  let vactive = false;

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
        console.log("PLAYERS O ID;", players[0].id);
        console.log("SOCKET ID:", socket.id);
        players.forEach((p, i) => {
          if (p.id === socket.id) {
            console.log("P:", p);
            setPlayer(p);
            vplayer = p;
            console.log(vplayer);
          }
        });
      });
      socket.on("player-start", (start_player) => {
        if (start_player.id === socket.id) {
          setActive(true);
          vactive = true;
          setActiveRoll(true);
        } else {
          setInactiveMsg(`${start_player.player} is currently rolling.`);
        }
      });
      socket.on("room-choose", (a_player) => {
        console.log("PLAYER:", playerRef.current);
        console.log("ACTIVE_PLAYER:", a_player);
        if (playerRef.current.id === a_player.id) {
          setActiveRoll(false);
          setActiveRoom(true);
        } else {
          setInactiveMsg(`${a_player.player} is currently choosing a room.`);
        }
      });
    }

    // endpoints
  }, [socket]);

  const sayHi = () => {
    socket.emit("say-hi");
  };

  const sendMessage = (message) => {
    socket.emit("send-message", { message });
  };

  const testFunction = () => {
    socket.emit("game-start");
  };

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

  console.log(vplayer);

  return (
    <SocketContext.Provider
      value={{
        sayHi,
        sendMessage,
        messages,
        testFunction,
        sendRoll,
        player,
        active,
        fakeplayer,
        currentRoom,
        setCurrentRoom,
        sendRoom,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
