import React from 'react'
import Drawer from '../components/Drawer'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { isAuthenticated, login } from '../auth';
import { Navigate } from 'react-router-dom';

 function DashboardDrawer() {

  console.log(login('admin1', 'admin1'))

    if(!isAuthenticated()){
      return <Navigate to="/login" />
    }
  
    const options = (
        <>
          <div className="icon-wrapper">
              <NotificationsOutlinedIcon /> 
          </div>
        </>
    );

  return (
        <Drawer options={options} title='Dashboard' />
  )
}

export default DashboardDrawer