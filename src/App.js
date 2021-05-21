import './App.css';
import HPContainer from './components/HPContainer';
import RoomCard from './components/Room/RoomCard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getAllRooms } from './API';
import { useEffect, useState } from 'react';

function App() {

  const [roomsAPI, setRoomsAPI] = useState([]);

  useEffect(() => {
    allRoomsAPI();
  }, []);


  const allRoomsAPI = async () => {
    const rooms = await getAllRooms();
    setRoomsAPI(rooms);
  };

  return (
    <>
      <Router>
        <Switch>
          <Route path="/room/:id">
            <RoomCard
              roomsAPI={roomsAPI}
            />
          </Route>
          <Route path='/'>
            <HPContainer />
          </Route>
        </Switch>
      </Router>
    </>

  );
}

export default App;
