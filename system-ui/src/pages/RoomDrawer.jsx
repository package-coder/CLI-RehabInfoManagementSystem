import React from 'react'

import { fetchTemplate } from '../auth';
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
  { id: 'id', label: "Room Number", minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'floor', label: 'Floor', minWidth: 50,  align: 'center' },
  { id: 'description', label: 'Description', minWidth: 170,  align: 'center' },
];

function createData({ id, floor, description, name }) {
  
  return {
    id, name, floor, description, update: <OptionComponent />
  };
}



function RoomDrawer() {
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = React.useState();

  
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);


  React.useEffect(() => {
    async function fetchData(){
      const data = await fetchTemplate('GET', '/api/v1/rooms/', null, true);
      setData(data)
    }

    fetchData()
  }, []);

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
      <RoomModal show={showModal} modaltitle="Add New Room" onHide={handleModalClose}  />
      <Table 
        columns={columns} 
        rows={
          data?.map(item => createData(item))
        } 


      />

    </Drawer>
  )
}

export default RoomDrawer