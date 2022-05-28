import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Drawer from './components/Drawer';
import PatientDrawer from './pages/PatientDrawer';
import EmptyDrawer from './pages/empty'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<PatientDrawer/>} />
            
          <Route path="/empty" element={ <EmptyDrawer/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
