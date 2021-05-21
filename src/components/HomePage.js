import LogoArea from './LogoArea';
import RoomArea from './Room/RoomArea';
import { getAllRooms } from '../API';
import { useEffect, useState } from 'react';

const HomePage = () => {

  const [roomsAPI, setRoomsAPI] = useState([]);

  useEffect(() => {
    allRoomsAPI();
  }, []);


  const allRoomsAPI = async () => {
    const rooms = await getAllRooms();
    setRoomsAPI(rooms);
  };

  return (
    <div className="home-page">
      <LogoArea />
      <RoomArea
        roomsAPI={roomsAPI}
      />
    </div>
  );
};

export default HomePage;