import React from 'react'

import Table from '../components/Table';
import Drawer from '../components/Drawer'
import SearchComponent from '../components/SearchComponent';
import PatientModal from '../components/modals/PatientModal';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

function RoomDrawer() {
  const [showModal, setShowModal] = React.useState(false);
  
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const options = (
      <>
        <div>
          <Button 
            className="rounded-3" 
            onClick={handleModalShow} 
            variant="contained" 
            startIcon={<AddIcon />}
          > 
            Add
          </Button>
        </div>
        <SearchComponent />
        <div className="icon-wrapper">
            <NotificationsOutlinedIcon /> 
        </div>
      </>
  );

  return (
    <Drawer options={options} title='Rooms'>
      <PatientModal show={showModal} onHide={handleModalClose}  />
      <Table></Table>
    </Drawer>
  )
}

export default RoomDrawer