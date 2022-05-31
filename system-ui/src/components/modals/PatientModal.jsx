import React from 'react'

import { Modal, Button, Form } from 'react-bootstrap'

function PatientModal(props) {

    if(props.data){
        
    }


  return (  
    <>
        <Modal {...props} size="lg" >
            <Modal.Header closeButton>
            <Modal.Title>{props.modaltitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="row gap-4 m-3" id="patientForm">
                    <Form.Group className="col">
                        <Form.Label className="fs-5 fw-bold mb-3">Personal Information</Form.Label>
                        <Form.Group className="mb-3" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control id='firstName' type="text" autoFocus required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control id='lastName' type="text" required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control id='middleName' type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control id='birthdate' type="date" required />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className="col mt-4">
                        <Form.Group className="mb-3" >
                            <Form.Label>Room Number</Form.Label>
                            <Form.Control id='roomNumber' type="number" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Illness</Form.Label>
                            <Form.Control id='illness' type="text" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Date Admitted</Form.Label>
                            <Form.Control id='dateAdmitted' type="date" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Date Discharged</Form.Label>
                            <Form.Control id='dateDischared' type="date" />
                        </Form.Group>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Close
            </Button>
           
            <Button variant="primary" onClick={()=> {
                    const patientForm = document.getElementById("patientForm");
                    const formData = new FormData(patientForm);
                    console.log(formData);
                    props.onSubmit(formData)
                    props.onHide()
                }}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default PatientModal