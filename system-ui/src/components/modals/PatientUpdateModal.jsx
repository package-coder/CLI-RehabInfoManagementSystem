import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { fetchTemplate } from '../../auth';

function PatientUpdateModal(props) {
    const formRef = React.useRef();
    const firstNameRef = React.useRef();
    const lastNameRef = React.useRef();
    const birthdateRef = React.useRef();
    const genderRef = React.useRef();
    const contactRef = React.useRef();
    const addressRef = React.useRef();
    const illnessRef = React.useRef();
    const dateAdmittedRef = React.useRef();
    const dateDischargedRef = React.useRef();
    const descriptionRef = React.useRef();

    const [data, setData] = React.useState();


    React.useEffect(() => {
        async function fetchData(){
          const data = await fetchTemplate('GET', `/api/v1/manage/patients/${props.id}`, null, true);
          setData(data)
        }
    
        fetchData()
    }, [props.id]);

    async function handleUpdate() {
        if(!formRef.current.reportValidity()) return;
  
        const data = new FormData();

        data.append('firstName', firstNameRef.current.value);
        data.append('lastName', lastNameRef.current.value);
        data.append('birthdate', birthdateRef.current.value);
        data.append('gender', genderRef.current.value);
        data.append('contact', birthdateRef.current.value);
        data.append('address', addressRef.current.value);
        data.append('illness', illnessRef.current.value);
        data.append('dateAdmitted', dateAdmittedRef.current.value);
        data.append('dateDischarged', dateDischargedRef.current.value);
        data.append('description', descriptionRef.current.value);
        

        fetchTemplate('PUT', `/api/v1/manage/patients/${props.id}`, data, true).then(() => {
            props.onHide();
        })
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
                            <Form.Label>ID</Form.Label>
                            <Form.Control id='id' defaultValue={data?.id} type="text" readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control id='firstName' ref={firstNameRef} defaultValue={data?.firstName} type="text" autoFocus required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control id='lastName' ref={lastNameRef} defaultValue={data?.lastName} type="text" required/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control id='birthdate' ref={birthdateRef} defaultValue={data?.birthdate} type="date" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control id='gender' ref={genderRef} defaultValue={data?.gender} type="text" required />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Contact</Form.Label>
                            <Form.Control id='contact' ref={contactRef} defaultValue={data?.contact}  maxLength="11" type="text" required/>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className="col mt-4">
                        <Form.Group className="mb-3" >
                            <Form.Label>Address</Form.Label>
                            <Form.Control id='address' ref={addressRef}  defaultValue={data?.address} type="text" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Illness</Form.Label>
                            <Form.Control id='illness' ref={illnessRef} defaultValue={data?.illness} type="text" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Date Admitted</Form.Label>
                            <Form.Control id='dateAdmitted' ref={dateAdmittedRef} defaultValue={data?.dateAdmitted} type="date" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Date Discharged</Form.Label>
                            <Form.Control id='dateDischared' ref={dateDischargedRef} defaultValue={data?.dateDischared} type="date" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control id='description' ref={descriptionRef} defaultValue={data?.description} type="textarea" />
                        </Form.Group>
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

export default PatientUpdateModal