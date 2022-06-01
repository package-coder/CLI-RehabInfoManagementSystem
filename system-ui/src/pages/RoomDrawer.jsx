import React from 'react'

import { fetchTemplate } from '../auth';
import Table from '../components/Table';
import Drawer from '../components/Drawer'
import SearchComponent from '../components/SearchComponent';
import RoomModal from '../components/modals/RoomModal';
import RoomUpdateModal from '../components/modals/RoomUpdateModal';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import Stack from '@mui/material/Stack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ConfirmationModal from '../components/modals/ConfirmationModal';


import Form from 'react-bootstrap/Form'
import FilterListIcon from '@mui/icons-material/FilterList';

function OptionComponent({ id }){
  const [optionModal, setOptionModal] = React.useState(false);
  const handleOptionModalCLose = () => setOptionModal(false);
  const handleOptionModalShow = () => setOptionModal(true);

  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const handleConfirmationModalClose = () => setConfirmationModal(false);
  const handleConfirmationModalShow = () => setConfirmationModal(true);

  async function handleDelete(){
    await fetchTemplate('DELETE', `/api/v1/manage/rooms/${id}`, null, true, true);
  }

  return(
    <>
    <RoomUpdateModal show={optionModal} id={id} onHide={handleOptionModalCLose}  />
    <ConfirmationModal show={confirmationModal} onHide={handleConfirmationModalClose} title="Delete" handlesucess={handleDelete} />
    <Stack direction="row" spacing={1}>
      <div className="icon-wrapper rounded-circle bg-primary bg-opacity-10" onClick={handleOptionModalShow}> <EditOutlinedIcon /> </div>
      <div className="icon-wrapper rounded-circle bg-danger bg-opacity-10" onClick={handleConfirmationModalShow} > <DeleteOutlineOutlinedIcon /> </div>
    </Stack>
    </>
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
    id, 
    name, 
    floor, 
    description, 
    update: <OptionComponent id={id} />
  };
}


function RoomDrawer() {
  
  const searchRef = React.useRef();

  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = React.useState();
  const [dynamicSearch, setDynamicSearch] = React.useState();

  
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  
  
  React.useEffect(() => {
    async function fetchData(){
      const data = await fetchTemplate('GET', '/api/v1/rooms/', null, true);
      setData(data)
    }

    fetchData()
  }, []);


  function handleOnSearch(e){
    const query = searchRef.current.value.toLowerCase();

    const filtered = data?.filter((item) => {
      return item.name.toLowerCase().startsWith(query)
    })

    setDynamicSearch(filtered);
  }

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
        <Form.Control type="text" placeholder="Search Name..." ref={searchRef} onChange={handleOnSearch} />
        <div className="icon-wrapper">
          <FilterListIcon />
        </div>
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
          (dynamicSearch ? dynamicSearch : data)?.map(item => createData(item))
        } 
      />

    </Drawer>
  )
}

export default RoomDrawer