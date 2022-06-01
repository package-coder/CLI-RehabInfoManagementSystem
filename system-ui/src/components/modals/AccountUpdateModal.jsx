import React from 'react'

import { Modal, Button, Form } from 'react-bootstrap'
import { fetchTemplate } from '../../auth';

function AccountUpdateModal(props) {

    const formRef = React.useRef();
    const usernameRef = React.useRef();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();

    const [data, setData] = React.useState();


    React.useEffect(() => {
        async function fetchData(){
          const user = await fetchTemplate('GET', `/api/v1/manage/users/${props.id}`, null, true);
          setData(user)
        }
    
        fetchData()
    }, []);


    async function handleUpdate(){
        if(!formRef.current.reportValidity()) return;


        const form = new FormData()
        form.append('username', usernameRef.current.value)
        form.append('email', emailRef.current.value)

        if(passwordRef.current.value)
            form.append('password', passwordRef.current.value)

        fetchTemplate('PATCH', `/api/v1/manage/users/${props.id}`, form, true)
        .finally(() => {
            props.onHide()
        })
    }

  return (  
    <>
        <Modal {...props} >
            <Modal.Header closeButton>
            <Modal.Title>Update Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form ref={formRef}>
                <Form.Group className="mb-3" >
                    <Form.Label>ID</Form.Label>
                    <Form.Control id='id' type="text"  defaultValue={data?.id} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control id='username' type="text" defaultValue={data?.username} ref={usernameRef} autoFocus  required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control id='email' type="email" defaultValue={data?.email} ref={emailRef} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id='password' type="password" ref={passwordRef} />
                    <Form.Label className="text-muted">{' <Leave unchanged if you wish to not change the password>'}</Form.Label>
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

export default AccountUpdateModal