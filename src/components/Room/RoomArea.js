import { Link } from "react-router-dom";


const RoomArea = ({ roomsAPI }) => {

  return (
    <>
      <div className="room-area">
        {roomsAPI.map((room, index) => {
          return (
            <Link key={room.id} to={`/room/${room.id}`}>
              <div className={`room-${index + 1}`}></div>
            </Link>
          )
        })}
      </div>
    </>
  );
};

export default RoomArea;