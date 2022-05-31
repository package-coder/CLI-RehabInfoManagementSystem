import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Drawer from './components/Drawer';
import PatientDrawer from './pages/PatientDrawer';
import RoomDrawer from './pages/RoomDrawer'
import AccountDrawer from './pages/AccountDrawer'
import DashboardDrawer from './pages/DashboardDrawer';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<DashboardDrawer/>} />
          <Route path="/patient" element={<PatientDrawer/>} />
          <Route path="/room" element={ <RoomDrawer/>} />
          <Route path="/account" element={ <AccountDrawer/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
