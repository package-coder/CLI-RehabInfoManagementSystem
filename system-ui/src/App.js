import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PatientDrawer from './pages/PatientDrawer';
import RoomDrawer from './pages/RoomDrawer'
import AccountDrawer from './pages/AccountDrawer'
import DashboardDrawer from './pages/DashboardDrawer';
import SettingDrawer from './pages/SettingDrawer';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<DashboardDrawer/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/patient" element={<PatientDrawer/>} />
          <Route path="/room" element={ <RoomDrawer/>} />
          <Route path="/account" element={ <AccountDrawer/>} />
          <Route path="/setting" element={ <SettingDrawer/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
