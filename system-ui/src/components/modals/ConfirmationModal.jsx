
import React from 'react';
import { Modal, Button } from 'react-bootstrap'




export default function ConfirmationModal( props ) {

    return (
      <>
        <Modal
          {...props}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header className="d-flex justify-content-center border-0 mt-3">
            <Modal.Title className='fs-3 fw-bold'>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center pt-0 text-muted">
            Are you sure you want to { props.title } this item?
          </Modal.Body>
          <Modal.Footer className='border-0 justify-content-center mt-2 mb-3'>
            <Button className="m-0 rounded-0 rounded-start" variant="secondary" onClick={props.onHide}> Cancel</Button>
            <Button className="m-0 rounded-0 rounded-end" variant="primary" onClick={() => {  props.handlesucess(); props.onHide(); }} >{ props.title }</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }