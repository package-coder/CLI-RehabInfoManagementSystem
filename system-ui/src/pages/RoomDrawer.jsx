import React from 'react'

import Table from '../components/Table';
import Drawer from '../components/Drawer'
import SearchComponent from '../components/SearchComponent';
import PatientModal from '../components/modals/PatientModal';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

const columns = [
  { id: 'room', label: "Room Number", minWidth: 100, align: 'center' },
  { id: 'floor', label: 'Floor', minWidth: 100,  align: 'center' },
  { id: 'description', label: 'Description', minWidth: 170,  align: 'center' },
  { id: 'update', label: '', minWidth: 50,  align: 'center' },
];

function createData(room, floor, description) {
  
  return {
    room, floor, description, update: 'update'
  };
}

const rows = [
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),
  createData(10, 2, 'Emergency Room'),

];


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
      <Table  columns={columns} rows={rows} ></Table>
    </Drawer>
  )
}

export default RoomDrawer