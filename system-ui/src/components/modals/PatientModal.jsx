import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import ConfirmationModal from './ConfirmationModal'
import { fetchTemplate } from '../../auth';

function PatientModal(props) {
    const formRef = React.useRef();
    const firstNameRef = React.useRef();
    const lastNameRef = React.useRef();
    const middleNameRef = React.useRef();
    const birthdateRef = React.useRef();
    const roomNumberRef = React.useRef();
    const illnessRef = React.useRef();
    const dateAdmittedRef = React.useRef();
    const dateDischargedRef = React.useRef();


    async function handleSubmit() {
        if(!formRef.current.reportValidity()) return;
  
        const data = new FormData();

        data.append('firstName', firstNameRef.current.value);
        data.append('lastName', lastNameRef.current.value);

        data.append('birthday', birthdateRef.current.value);
        data.append('room', roomNumberRef.current.value);
        data.append('illness', illnessRef.current.value);
        data.append('dateAdmitted', dateAdmittedRef.current.value);
        data.append('dateDischarge', dateDischargedRef.current.value);
        

        const res = await fetchTemplate('POST', '/api/v1/patients/', data, true);
        props.onHide();
    }

  return (  
    <>
        <Modal {...props} size="lg" >
            <Modal.Header closeButton>
            <Modal.Title>{props.modaltitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="row gap-4 m-3" id="patientForm" ref={formRef}>
                    <Form.Group className="col">
                        <Form.Label className="fs-5 fw-bold mb-3">Personal Information</Form.Label>
                        <Form.Group className="mb-3" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control id='firstName' ref={firstNameRef} type="text" autoFocus required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control id='lastName' ref={lastNameRef} type="text" required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control id='middleName' ref={middleNameRef} type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control id='birthdate' ref={birthdateRef} type="date" required />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className="col mt-4">
                        <Form.Group className="mb-3" >
                            <Form.Label>Room Number</Form.Label>
                            <Form.Control id='roomNumber' ref={roomNumberRef} type="number" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Illness</Form.Label>
                            <Form.Control id='illness' ref={illnessRef} type="text" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Date Admitted</Form.Label>
                            <Form.Control id='dateAdmitted' ref={dateAdmittedRef} type="date" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Date Discharged</Form.Label>
                            <Form.Control id='dateDischared' ref={dateDischargedRef} type="date" />
                        </Form.Group>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Close
            </Button>
           
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default PatientModal