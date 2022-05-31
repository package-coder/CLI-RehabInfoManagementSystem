import React from 'react'

import Table from '../components/Table';
import Drawer from '../components/Drawer'
import SearchComponent from '../components/SearchComponent';
import AccountModal from '../components/modals/AccountModal';

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
  { id: 'update', label: '', minWidth: 20, align: 'center' },
  { id: 'id', label: 'Employee ID', minWidth: 50},
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'address', label: "Address", minWidth: 170 },
  { id: 'username', label: 'Username', minWidth: 100, align: 'center' },
  { id: 'password', label: 'Password', minWidth: 100, align: 'center' },
];

function createData(id, firstName, lastName, username, password, address) {
  let name = `${lastName}, ${firstName}`;
  
  return {
    id,
    name,
    username,
    password,
    address,
    update: <OptionComponent />
  };
}

const rows = [
  createData(10, 'John', 'Smith', 'username','password', 'address'),
  createData(10, 'John', 'Smith', 'username','password', 'address'),
  createData(10, 'John', 'Smith', 'username','password', 'address'),
  createData(10, 'John', 'Smith', 'username','password', 'address'),
  createData(10, 'John', 'Smith', 'username','password', 'address'),
  createData(10, 'John', 'Smith', 'username','password', 'address'),
  createData(10, 'John', 'Smith', 'username','password', 'address'),
];

function AccountDrawer() {
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
    <Drawer options={options} title='Accounts'>
      <AccountModal show={showModal} onHide={handleModalClose} modalTitle="Add New Account"  />
      <Table columns={columns} rows={rows} ></Table>
    </Drawer>
  )
}

export default AccountDrawer