import React from 'react'

import Table from '../components/Table';
import Drawer from '../components/Drawer'
import SearchComponent from '../components/SearchComponent';
import PatientModal from '../components/modals/PatientModal';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

function EmptyDrawer() {
  const [showModal, setShowModal] = React.useState(false);
  
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const options = (
      <>
        
        <SearchComponent />
        
      </>
  );

  return (
    <Drawer options={options} title='Empty'>
      <PatientModal show={showModal} onHide={handleModalClose}  />
      <Table></Table>
    </Drawer>
  )
}

export default EmptyDrawer