import React from 'react'

import { Modal, Button, Form } from 'react-bootstrap'

function PatientModal(props) {

  return (  
    <>
        <Modal {...props} >
            <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="Form.id">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control id='id' type="number" readOnly/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Form.firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control id='firstName' type="text" autoFocus required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Form.lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control id='lastName' type="text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Form.address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control id='address' type="text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Form.username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control id='username' type="text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Form.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id='password' type="password" required/>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Close
            </Button>
           
            <Button variant="primary" onClick={props.onHide}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default PatientModal