import React, { useState } from 'react'
import { Button, Modal, Table, Form } from 'react-bootstrap'


const AllEventsModal = (props) => {
    const [event_name, set_event_name] = useState("")
    const [event_description, set_event_description] = useState("")
    const [user_name, set_user_name] = useState("")
    const [isdisabled, set_disabled] = useState(true)
    const [id, set_id] = useState(null)
    let show = props.display

    const handleClose = () => {

        props.close()

    };

    let table_rows = null

    if (props.events) {
        table_rows = props.events.map((data, index) => {
            
            return (
                <tr key={index}>
                    <td>{data.username}</td>
                    <td>{data.event_name}</td>
                    <td>{data.event_description}</td>
                    <td><Button variant="dark" onClick={() => {
                        set_disabled(false)
                        set_user_name(data.username)
                        set_event_name(data.event_name)
                        set_event_description(data.event_description)
                        set_id(data.id)

                    }} >Edit</Button></td>
                    <td><Button variant="dark" onClick={() => {
                        props.delete(data)
                    
                        
                    }} >Delete</Button></td>
                </tr>
            )
        })
    }

    return (
        <>

            <Modal dialogClassName="width-set"  show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>All Events Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Table className="cTable" striped bordered hover id="mbody">
                        <thead>
                            <tr>
                                <th>USERNAME</th>
                                <th>EVENT NAME</th>
                                <th>EVENT DESCRIPTION</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table_rows}
                        </tbody>
                    </Table>

                    <div hidden={isdisabled}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Username" onChange={(e) => { set_user_name(e.target.value) }} value={user_name} />
                            <br />
                            <Form.Control type="text" placeholder="Event Name" onChange={(e) => { set_event_name(e.target.value) }}  value={event_name}/>
                            <br />
                            <Form.Control as="textarea" rows="3" placeholder="Event Description" onChange={(e) => { set_event_description(e.target.value) }} value={event_description}/>
                        </Form.Group>
                        <Button variant="dark" onClick={() => {
                            set_disabled(true)
                            let data = {
                                id,
                                username:user_name,
                                event_name,
                                event_description
                            }

                            props.edit(data)
                            

                        }} >Edit</Button>

                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
            </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AllEventsModal
