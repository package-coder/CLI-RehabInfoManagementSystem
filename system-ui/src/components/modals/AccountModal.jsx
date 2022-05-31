import React from 'react'

import { Modal, Button, Form } from 'react-bootstrap'
import { fetchTemplate } from '../../auth';

function PatientModal(props) {

    const formRef = React.useRef();
    const firstNameRef = React.useRef();
    const lastNameRef = React.useRef();
    const addressRef = React.useRef();
    const usernameRef = React.useRef();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();


    async function handleSubmit(){
        if(!formRef.current.reportValidity()) return;

        const data = new FormData();
        const userData = new FormData()
        data.append('firstName', firstNameRef.current.value)
        data.append('lastName', lastNameRef.current.value)
        data.append('address', addressRef.current.value)

        userData.append('username', usernameRef.current.value)
        userData.append('email', emailRef.current.value)
        userData.append('password', passwordRef.current.value)

        const user = await fetchTemplate('POST', '/api/v1/users/', userData, true);

        data.append('sysId', user.id);

        await fetchTemplate('POST', '/api/v1/employees/', data, true);
        
        props.onHide()
    }

  return (  
    <>
        <Modal {...props} >
            <Modal.Header closeButton>
            <Modal.Title>{props.modaltitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form ref={formRef}>
                <Form.Group className="mb-3" >
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control id='id' type="text" placeholder="<Value Generated>" readOnly/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control id='firstName' type="text" ref={firstNameRef} autoFocus required/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control id='lastName' type="text" ref={lastNameRef} required/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Address</Form.Label>
                    <Form.Control id='address' type="text" ref={addressRef}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control id='username' type="text" ref={usernameRef} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control id='email' type="email" ref={emailRef} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id='password' type="password" ref={passwordRef} required/>
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