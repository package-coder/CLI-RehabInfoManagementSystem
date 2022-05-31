import React from 'react'
import { fetchTemplate } from '../auth';

import Table from '../components/Table';
import Drawer from '../components/Drawer'
import SearchComponent from '../components/SearchComponent';
import PatientModal from '../components/modals/PatientModal';


import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ConfirmationModal from '../components/modals/ConfirmationModal';

import Stack from '@mui/material/Stack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function OptionComponent(){
  return(
    <Stack direction="row" spacing={1}>
      <div className="icon-wrapper rounded-circle bg-primary bg-opacity-10"> <EditOutlinedIcon /> </div>
    </Stack>
  );
}

const columns = [
  { id: 'update', label: '', minWidth: 20, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'room', label: "Room Number", minWidth: 100, align: 'center' },
  { id: 'illness', label: 'Illness', minWidth: 100 },
  { id: 'age', label: 'Age', minWidth: 100, align: 'center', },
  { id: 'dateAdmitted', label: 'Date Admitted', minWidth: 100 },
  { id: 'isDischarged', label: 'Is Discharged', minWidth: 100, align: 'center', },
];

function createData(room, firstName, lastName, illness, age, dateAdmitted, isDischarged) {
  let name = `${lastName}, ${firstName}`;

  
  return {
    room,
    name,
    illness,
    age,
    dateAdmitted,
    isDischarged,
    update: <OptionComponent />
  };
}

const rows = [
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
  createData(10, 'Test name', 'test', 'illness', 56, 'dateadmitted', 'true'),
];


function PatientDrawer() {
  
  
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = React.useState();
  
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  // React.useEffect(async () => {
  //   const data = await fetchTemplate('GET', 'api/v1/patients', null, true);

  // }, []);

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

  async function handleModalSubmit(form){
    await fetchTemplate('POST', '/api/v1/patients/', form, true);
  }

  return (
    <Drawer options={options} title='Patients'>
      <PatientModal show={showModal} modaltitle="Add New Patient" onHide={handleModalClose}  onSubmit={handleModalSubmit}/>
      <Table columns={columns} rows={rows} ></Table>
    </Drawer>
  )
}

export default PatientDrawer