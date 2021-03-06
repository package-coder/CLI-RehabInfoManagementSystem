import React from 'react'

import { Modal, Button, Form } from 'react-bootstrap'
import { fetchTemplate } from '../../auth';

function AccountModal(props) {

    const formRef = React.useRef();
    const usernameRef = React.useRef();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();


    async function handleSubmit(){
        formRef.current.classList.add('was-validated')

        if(!formRef.current.checkValidity()) return;

        const form = new FormData()
        form.append('username', usernameRef.current.value)
        form.append('email', emailRef.current.value)
        form.append('password', passwordRef.current.value)

        fetchTemplate('POST', '/api/v1/users/', form, true)
        .then(() => {
            props.onHide()
        })
        .catch((e) => {
            usernameRef.current.value =  '';
            usernameRef.current.classList.add('is-invalid')
        })
    }

  return (  
    <>
        <Modal {...props} >
            <Modal.Header closeButton>
            <Modal.Title>{props.modaltitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form ref={formRef} noValidate >
                <Form.Group className="mb-3" >
                    <Form.Label>ID</Form.Label>
                    <Form.Control id='id' type="text" placeholder="<Value Generated>" readOnly/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control id='username' type="text" ref={usernameRef} required/>
                    <Form.Control.Feedback type="invalid">
                        Username already chosen. Try another username
                    </Form.Control.Feedback>
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
                Add
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default AccountModal