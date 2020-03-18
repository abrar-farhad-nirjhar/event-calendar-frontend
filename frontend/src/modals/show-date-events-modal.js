import React from 'react'
import { Button, Modal, Table } from 'react-bootstrap'


const AllEventsModal = (props) => {
    let show = props.display

    const handleClose = () => {

        props.close()

    };

    let table_rows = null

    if(props.events){
        table_rows = props.events.map((data, index) => {
            console.log(index)
            return (
                <tr key={index}>
                    <td>{data.username}</td>
                    <td>{data.event_name}</td>
                    <td>{data.event_description}</td>
                    <td><Button variant="dark"  >Edit</Button></td>
                    <td><Button variant="dark" onClick={()=>{
                        props.delete(data)
                        // props.events.splice(index)
                        console.log(props.events)
                        console.log("hello")
                    }} >Delete</Button></td>
                </tr>
            )
        })
    }

    return (
        <>

            <Modal className="myModal" show={show} onHide={handleClose}>
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
