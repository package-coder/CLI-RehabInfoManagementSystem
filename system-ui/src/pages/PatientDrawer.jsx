import React from 'react'
import { fetchTemplate } from '../auth';

import Table from '../components/Table';
import Drawer from '../components/Drawer'
import PatientModal from '../components/modals/PatientModal';

import PatientUpdateModal from '../components/modals/PatientUpdateModal';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import Stack from '@mui/material/Stack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FilterListIcon from '@mui/icons-material/FilterList';

import Form from 'react-bootstrap/Form'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ConfirmationModal from '../components/modals/ConfirmationModal';




function OptionComponent({ id }){
  const [optionModal, setOptionModal] = React.useState(false);
  const handleOptionModalCLose = () => setOptionModal(false);
  const handleOptionModalShow = () => setOptionModal(true);

  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const handleConfirmationModalClose = () => setConfirmationModal(false);
  const handleConfirmationModalShow = () => setConfirmationModal(true);

  async function handleDelete(){
    await fetchTemplate('DELETE', `/api/v1/manage/patients/${id}`, null, true, true);
  }

  return(
    <>
    <PatientUpdateModal show={optionModal} id={id} onHide={handleOptionModalCLose}  />
    <ConfirmationModal show={confirmationModal} onHide={handleConfirmationModalClose} title="Delete" handlesucess={handleDelete} />
    <Stack direction="row" spacing={1}>
      <div className="icon-wrapper rounded-circle bg-primary bg-opacity-10" onClick={handleOptionModalShow}> <EditOutlinedIcon /> </div>
      <div className="icon-wrapper rounded-circle bg-danger bg-opacity-10" onClick={handleConfirmationModalShow} > <DeleteOutlineOutlinedIcon /> </div>
    </Stack>
    </>
  );
}

const columns = [
  { id: 'update', label: '', minWidth: 20, align: 'center' },
  { id: 'id', label: "ID", minWidth: 100, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'birthdate', label: 'Birthdate', minWidth: 100, align: 'center' },
  { id: 'contact', label: 'Contact #', minWidth: 100, align: 'center' },
  { id: 'gender', label: 'Gender', minWidth: 100, align: 'center' },
  { id: 'address', label: 'Address', minWidth: 170 },
  { id: 'illness', label: 'Illness', minWidth: 170 },
  { id: 'dateAdmitted', label: 'Date Admitted', minWidth: 100, align: 'center' },
  { id: 'isDischarged', label: 'Is Discharged', minWidth: 100, align: 'center', },
];

function createData({ id, firstName, lastName, illness, gender, contact, address, birthdate, dateAdmitted, dateDischarged, description }) {
  let name = `${lastName}, ${firstName}`;

  
  return {
    id,
    name,
    illness, 
    gender, 
    contact, 
    address, 
    birthdate, 
    dateAdmitted,
    description,
    isDischarged: dateDischarged && ( <CheckCircleIcon className="text-primary"/>),
    update: <OptionComponent id={id}/>
  };
}



function PatientDrawer() {

  const searchRef = React.useRef();
  
  
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = React.useState();
  const [dynamicSearch, setDynamicSearch] = React.useState();

  
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  React.useEffect(() => {
    async function fetchData(){
      const data = await fetchTemplate('GET', '/api/v1/patients/', null, true);
      setData(data)
    }

    fetchData()
  }, []);


  function handleOnSearch(e){
    const query = searchRef.current.value;

    const filtered = data?.filter((item) => {
      return item.firstName.toLowerCase().startsWith(query.toLowerCase()) || 
        item.lastName.toLowerCase().startsWith(query.toLowerCase()) || 
        item.id.toString().startsWith(query) ||
        item.illness.toLowerCase().startsWith(query.toLowerCase())
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
        <Form.Control type="text" placeholder="Search name/id/illness..." ref={searchRef} onChange={handleOnSearch} />
        <div className="icon-wrapper">
          <FilterListIcon />
        </div>
      </>
  );


  return (
    <Drawer options={options} title='Patients'>
      <PatientModal show={showModal} modaltitle="Add New Patient" onHide={handleModalClose} />
      <Table 
        columns={columns} 
        rows={
          (dynamicSearch ? dynamicSearch : data)?.map(item => createData(item))
        } 
        />
    </Drawer>
  )
}

export default PatientDrawer