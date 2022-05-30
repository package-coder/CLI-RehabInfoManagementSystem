import React from 'react'

import Table from '../components/Table';
import Drawer from '../components/Drawer'
import SearchComponent from '../components/SearchComponent';
import PatientModal from '../components/modals/PatientModal';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'room', label: "Room Number", minWidth: 100, align: 'center' },
  { id: 'illness', label: 'Illness', minWidth: 100 },
  { id: 'age', label: 'Age', minWidth: 100, align: 'center', },
  { id: 'dateAdmitted', label: 'Date Admitted', minWidth: 100 },
  { id: 'isDischarged', label: 'Is Discharged', minWidth: 100, align: 'center', },
  { id: 'update', label: '', minWidth: 50, align: 'center' },
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
    update: 'edit'
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
    <Drawer options={options} title='Patients'>
      <PatientModal show={showModal} onHide={handleModalClose}  />
      <Table columns={columns} rows={rows} ></Table>
    </Drawer>
  )
}

export default PatientDrawer