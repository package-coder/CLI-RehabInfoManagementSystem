import React from 'react'

import { Modal, Button, Form } from 'react-bootstrap'
import { fetchTemplate } from '../../auth';

function RoomModal(props) {

    const formRef = React.useRef();
    const nameRef = React.useRef("name");
    const floorRef = React.useRef(2);
    const descRef = React.useRef("desc");


    async function handleSubmit(){
        if(!formRef.current.reportValidity()) return;

        const data = new FormData();
        data.append('floor', floorRef.current.value);
        data.append('description', descRef.current.value);
        data.append('name', nameRef.current.value);

        const res = await fetchTemplate('POST', '/api/v1/rooms/', data, true);
        props.onHide()
    }

  return (  
    <>
        <Modal {...props}>
            <Modal.Header closeButton>
            <Modal.Title>{props.modaltitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Room Number</Form.Label>
                        <Form.Control id='roomNumber' placeholder="<Value Generated>" readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control id='name' ref={nameRef}  type="text" autoFocus required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Floor</Form.Label>
                        <Form.Control id='floor' ref={floorRef}  type="number" required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control id='description' ref={descRef}   type="text"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Close
            </Button>
           
            <Button variant="primary" onClick={handleSubmit}>
                Add
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default RoomModal