import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Rooms } from './Pages/Rooms';
import { PendingReservations } from './Pages/PendingReservations';
import { ConfirmReservations } from './Pages/ConfirmReservations';
import { CloseReservations } from './Pages/CloseReservations';
import { CancelReservations } from './Pages/CacnelReservations';
import { Error } from './Pages/Error';
import { Hotel } from './Pages/Hotel';
import { HotelListing } from './Pages/HotelListing';
import { RoomListing } from './Pages/RoomListing';
import { ReservationDetails } from './Pages/ReservationDetails';
import { Login } from './Pages/Login';
import { AddHotel } from './Pages/AddHotel';
import { AddRoom } from './Pages/AddRoom';
import {RoomImage} from './Pages/RoomImage';
import { Loader } from './Components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CompleteProfile } from './Pages/CompleteProfile';
import { Error2 } from './Pages/Error2';
import { UpdateRoom } from './Pages/UpdateRoom';
import { UpdateHotel } from './Pages/UpdateHotel';

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <Routes>
    <Route path='/' Component={Home}></Route>
    <Route path='/login' Component={Login}></Route>
    <Route path='/find/rooms' Component={Rooms}></Route>
    {/* <Route path='/find/hotels' Component={Hotel}></Route> */}
    <Route path='/f/room/:id' Component={RoomListing}></Route>
    <Route path='/f/hotel/:id' Component={HotelListing}></Route>
    {/* <Route path='/find/users' Component={FindUsers}></Route> */}
    <Route path='/pendingreservation' Component={PendingReservations}></Route>
    <Route path='/confirmedreservation' Component={ConfirmReservations}></Route>
    <Route path='/closereservation' Component={CloseReservations}></Route>
    <Route path='/cancelreservation' Component={CancelReservations}></Route>
    <Route path='/reservation/:id' Component={ReservationDetails}></Route>
    <Route path='/add/hotel' Component={AddHotel}></Route>
    <Route path='/complete/:id' Component={CompleteProfile}></Route>
    <Route path='/update' Component={UpdateHotel}></Route>
    <Route path='/add/room' Component={AddRoom}></Route>
    <Route path='/updateroom/:id' Component={UpdateRoom}></Route>
    <Route path='/a/room/:id' Component={RoomImage}></Route>
    <Route path='/*' Component={Error}></Route>
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
