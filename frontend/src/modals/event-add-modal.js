import React, {useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'


const EventAddModal = (props) => {
    const [event_name, set_event_name] = useState("")
    const [event_description, set_event_description] = useState("")
    const [user_name, set_user_name] = useState("")
    let show = props.display
    
    const handleClose = () => {
        let data = {
            user_name,
            event_name,
            event_description,
        }
        console.log(props)
        
        props.add(data)
        

        props.close()

    };

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Event Add Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Username" onChange={(e)=>{set_user_name(e.target.value)}}/>
                        <br />
                        <Form.Control type="text" placeholder="Event Name"  onChange={(e)=>{set_event_name(e.target.value)}}/>
                        <br />
                        <Form.Control as="textarea" rows="3" placeholder="Event Description" onChange={(e)=>{set_event_description(e.target.value)}}/>
                    </Form.Group>
                </Modal.Body>
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

export default EventAddModal
