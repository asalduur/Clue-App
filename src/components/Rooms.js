const Rooms = ({ roomColors }) => {
  return (
    <>
      {roomColors.map((color, index) => {
        return (
          <div className={`${color}Room`} key={index}>
            <h2 className={`${color}Text`}>{color.toUpperCase()} ROOM</h2>
          </div>
        );
      })}
    </>
  );
};

export default Rooms;
