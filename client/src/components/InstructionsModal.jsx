import React, { EventHandler, useEffect } from 'react'
import { useState, useContext } from 'react'
import TodoItem from './TodoItem'
import {Modal, Button, ListGroup} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './InstructionsModal.css';
import {emailContext} from './Context'
import {validateEmail} from '../utility/utilityFunctions';

function InstructionsModal() {

    const [show, setShow] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (     
        <div className="InstructionsModal">     
        <Button className="modal-btn" variant='primary' onClick={handleShow}>Instructions</Button>                  
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hey There! Below are some baseline rules to get started.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ListGroup as="ol" numbered>
            <ListGroup.Item as="li" className="ListGroup">Set your email</ListGroup.Item>
            <ListGroup.Item as="li" className="ListGroup">Add a title, date, and some tags to create a todo-item</ListGroup.Item>
            <ListGroup.Item as="li" className="ListGroup">Use the plus button to add your items and receive email reminders</ListGroup.Item>
            <ListGroup.Item as="li" className="ListGroup">Sort your items by due date or completion using the date and todo buttons</ListGroup.Item>
            </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Get Started!
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}

export default InstructionsModal;
