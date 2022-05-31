import React from 'react'

import Table from '../components/Table';
import Drawer from '../components/Drawer'
import SearchComponent from '../components/SearchComponent';
import RoomModal from '../components/modals/RoomModal';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import Stack from '@mui/material/Stack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function OptionComponent(){
  return(
    <Stack direction="row" spacing={1}>
      <div className="icon-wrapper rounded-circle bg-primary bg-opacity-10"> <EditOutlinedIcon /> </div>
      <div className="icon-wrapper rounded-circle bg-danger bg-opacity-10"> <DeleteOutlineOutlinedIcon /> </div>
    </Stack>
  );
}

const columns = [
  { id: 'update', label: '', minWidth: 20,  align: 'center' },
  { id: 'room', label: "Room Number", minWidth: 50 },
  { id: 'floor', label: 'Floor', minWidth: 50,  align: 'center' },
  { id: 'description', label: 'Description', minWidth: 170,  align: 'center' },
];

function createData(room, floor, description) {
  
  return {
    room, floor, description, update: <OptionComponent />
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
      <RoomModal show={showModal} modalTitle="Add New Room" onHide={handleModalClose}  />
      <Table columns={columns} rows={rows} ></Table>
    </Drawer>
  )
}

export default RoomDrawer