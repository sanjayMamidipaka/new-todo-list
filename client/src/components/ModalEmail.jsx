import React, { EventHandler, useEffect } from 'react'
import { useState, useContext } from 'react'
import TodoItem from './TodoItem'
import {Modal, Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {emailContext} from './Context'
import axios from 'axios';

function ModalEmail() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useContext(emailContext);

    const handleEmail = async () => {
      try {
        const emailListId = (await axios.put("/sendgrid/api/contacts/createContact", {email})).data
        localStorage.setItem("email", JSON.stringify({email, emailListId}));
        setShow(false);
        console.log(emailListId)
      } catch(e) {
        console.log(e);
      }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (     
        <div>
        <Button variant='primary' onClick={handleShow}>{localStorage.getItem("email") === "" ? "Set Your Email" : "Update Your Email"}</Button>            
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose an email to receive reminders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEmail}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}

export default ModalEmail
