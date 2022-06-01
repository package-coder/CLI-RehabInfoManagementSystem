import React from 'react'

import { Modal, Button, Form } from 'react-bootstrap'
import { fetchTemplate } from '../../auth';

function RoomUpdateModal(props) {

    const formRef = React.useRef();
    const nameRef = React.useRef();
    const floorRef = React.useRef();
    const descRef = React.useRef();

    const [data, setData] = React.useState();


    React.useEffect(() => {
        async function fetchData(){
          const data = await fetchTemplate('GET', `/api/v1/manage/rooms/${props.id}`, null, true);
          setData(data)
        }
    
        fetchData()
    }, []);

      
    function handleUpdate(){
        if(!formRef.current.reportValidity()) return;

        const data = new FormData();
        data.append('floor', floorRef.current.value);
        data.append('description', descRef.current.value);
        data.append('name', nameRef.current.value);

        
        fetchTemplate('PUT', `/api/v1/manage/rooms/${props.id}`, data, true).then(res => {
            props.onHide()
        })
    }

  return (  
    <>
        <Modal {...props}>
            <Modal.Header closeButton>
            <Modal.Title>Update Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef}>
                    <Form.Group className="mb-3">
                        <Form.Label>Room Number</Form.Label>
                        <Form.Control id='roomNumber' defaultValue={data?.id}  readOnly/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control id='name' ref={nameRef} defaultValue={data?.name} type="text" autoFocus required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Floor</Form.Label>
                        <Form.Control id='floor' ref={floorRef} defaultValue={data?.floor} type="number" required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control id='description' ref={descRef} defaultValue={data?.description}   type="text"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Close
            </Button>
           
            <Button variant="primary" onClick={handleUpdate}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default RoomUpdateModal