import React from 'react'

import { Modal, Button, Form } from 'react-bootstrap'

function RoomModal(props) {

    if(props.data){
        
    }


  return (  
    <>
        <Modal {...props}>
            <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="Form.roomNumber">
                        <Form.Label>Room Number</Form.Label>
                        <Form.Control id='roomNumber' type="number" readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Form.floor">
                        <Form.Label>Floor</Form.Label>
                        <Form.Control id='floor' type="number" autoFocus required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Form.description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control id='description' type="text" required/>
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

export default RoomModal