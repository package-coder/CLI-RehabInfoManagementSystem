import './App.css';
import { Routes, Route } from 'react-router-dom';

import PatientDrawer from './pages/PatientDrawer';
import RoomDrawer from './pages/RoomDrawer'
import AccountDrawer from './pages/AccountDrawer'
import DashboardDrawer from './pages/DashboardDrawer';
import SettingDrawer from './pages/SettingDrawer';
import LoginPage from './pages/LoginPage';
import AuthenticatedPage from './pages/AuthenticatedPage';

function App() {


  return (
    <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<AuthenticatedPage><PatientDrawer/></AuthenticatedPage>} />
        <Route path="/account" element={<AuthenticatedPage><AccountDrawer/></AuthenticatedPage>} />
        {/* <Route path="/room" element={<AuthenticatedPage><RoomDrawer/></AuthenticatedPage>} /> */}
        {/* <Route path="/" element={ <AuthenticatedPage><DashboardDrawer/></AuthenticatedPage>} /> */}
        {/* <Route path="/setting" element={ <AuthenticatedPage><SettingDrawer/></AuthenticatedPage>} /> */}
    </Routes>
  );
}

export default App;
