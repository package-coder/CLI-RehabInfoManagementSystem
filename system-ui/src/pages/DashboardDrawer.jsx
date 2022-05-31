import React from 'react'
import Drawer from '../components/Drawer'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { fetchTemplate, login } from '../auth';

 function DashboardDrawer() {

  login('admin', 'admin');
  
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