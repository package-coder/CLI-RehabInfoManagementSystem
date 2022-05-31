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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

function createData({ room, firstName, lastName, illness, age, dateAdmitted, dateDischarge }) {
  let name = `${lastName}, ${firstName}`;

  
  return {
    room,
    name,
    illness,
    age,
    dateAdmitted,
    isDischarged: dateDischarge && ( <CheckCircleIcon className="text-primary"/>),
    update: <OptionComponent />
  };
}



function PatientDrawer() {
  
  
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = React.useState();
  
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  React.useEffect(() => {
    async function fetchData(){
      const data = await fetchTemplate('GET', '/api/v1/patients/', null, true);
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
    <Drawer options={options} title='Patients'>
      <PatientModal show={showModal} modaltitle="Add New Patient" onHide={handleModalClose} />
      <Table 
        columns={columns} 
        rows={
          data?.map(item => createData(item))
        } 
        />
    </Drawer>
  )
}

export default PatientDrawer