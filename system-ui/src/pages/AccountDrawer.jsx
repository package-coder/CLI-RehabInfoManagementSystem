import React from 'react'

import { fetchTemplate, getAuthId } from '../auth';

import Table from '../components/Table';
import Drawer from '../components/Drawer'
import SearchComponent from '../components/SearchComponent';
import AccountModal from '../components/modals/AccountModal';
import AccountUpdateModal from '../components/modals/AccountUpdateModal';
import ConfirmationModal from '../components/modals/ConfirmationModal';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import Stack from '@mui/material/Stack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';

import Form from 'react-bootstrap/Form'




const columns = [
  { id: 'update', label: '', minWidth: 20, align: 'center' },
  { id: 'id', label: 'ID', minWidth: 170, },
  { id: 'username', label: 'Username', minWidth: 170, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 170, align: 'center'  },
];

function OptionComponent({ id, noDelete }){
  const [optionModal, setOptionModal] = React.useState(false);
  const handleOptionModalCLose = () => setOptionModal(false);
  const handleOptionModalShow = () => setOptionModal(true);

  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const handleConfirmationModalClose = () => setConfirmationModal(false);
  const handleConfirmationModalShow = () => setConfirmationModal(true);

  async function handleDelete(){
    await fetchTemplate('DELETE', `/api/v1/manage/employees/${id}`, null, true, true);
  }

  return(
    <>
    <AccountUpdateModal show={optionModal} id={id} onHide={handleOptionModalCLose}  />
    <ConfirmationModal show={confirmationModal} onHide={handleConfirmationModalClose} title="Delete" handlesucess={handleDelete} />
    <Stack direction="row" spacing={1}>
      <div className="icon-wrapper rounded-circle bg-primary bg-opacity-10" onClick={handleOptionModalShow}> <EditOutlinedIcon /> </div>
      { (noDelete && <div className="icon-wrapper rounded-circle bg-danger bg-opacity-10" onClick={handleConfirmationModalShow} > <DeleteOutlineOutlinedIcon /> </div>) }
    </Stack>
    </>
  );
}

function createData({ id, username, email }) {
  return {
    id,
    username,
    email,
    update: <OptionComponent id={id} noDelete={id != getAuthId()}/>
  };
}



function AccountDrawer() {

  const searchRef = React.useRef();

  const [data, setData] = React.useState();

  const [dynamicSearch, setDynamicSearch] = React.useState();
  
  const [showModal, setShowModal] = React.useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  

  React.useEffect(() => {
    async function fetchData(){
      let data = await fetchTemplate('GET', '/api/v1/users/', null, true);
      setData(data)
    }

    fetchData()
  }, []);


  function handleOnSearch(e){
    const query = searchRef.current.value.toLowerCase();

    const filtered = data?.filter((item) => {
      return item.id.toString().startsWith(query) || item.username.startsWith(query);
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

      </>
  );
  

  return (
    <Drawer options={options} title='Accounts'>
      <AccountModal show={showModal} onHide={handleModalClose} modaltitle="Add New Account"  />
      <Table 
        columns={columns} 
        rows={
          (dynamicSearch ? dynamicSearch : data)?.map(item => createData(item))
        } 
      />
    </Drawer>
  )
}

export default AccountDrawer