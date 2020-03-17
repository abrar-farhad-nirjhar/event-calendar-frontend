import React from 'react'
import { Button, Modal } from 'react-bootstrap'


const AllEventsModal=(props)=>{
    let show = props.display
    console.log(props)
    const handleClose = () => {

        props.close()

    };
  
    return (
      <>
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>All Events Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default AllEventsModal
  