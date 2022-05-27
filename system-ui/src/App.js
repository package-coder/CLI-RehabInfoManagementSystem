import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import Drawer from './components/Drawer';

import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import Table from './components/Table';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      

      <Routes>
          <Route path="/" element={ <Drawer title='Dashboard'>
              <Table></Table>
            </Drawer>} />
            
          <Route path="/empty" element={ <Drawer title="Empty" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
