const Rooms = ({ roomNames }) => {
  return (
    <>
      {roomNames.map((room, index) => {
        return (
          <div key={index} className={`${room.room}Background`}>
            <h2 className="roomName">{room.room.toUpperCase()}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Rooms;
