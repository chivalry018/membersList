import React, { Component, useEffect, useState } from 'react';
import { browserHistory } from 'react-router'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Modal,Button, Form,InputGroup, FormGroup} from 'react-bootstrap'

function Index(props) {
	const [show,setShow] = useState(false)
	const router = browserHistory

	const handleOpen = () => setShow(true)
	const handleClose = () => setShow(false)

	const gotoMember =()=>{
		router.push("/members")
	}

	return (
		<>
		<Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Main</Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="#home">About Us</Nav.Link>
            <Nav.Link onClick={gotoMember}>Member</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;
			<Button variant="light" onClick={handleOpen}>Sign In</Button>
          </Nav>
        </Container>
      	</Navbar>
		{/* <div id="main-body" >			
			<button className='btn btn-primary' onClick={gotoMember}>Member</button>
		</div> */}
		<div>
		<Modal show={show}  className="dark-modal">
				<Modal.Header closeButton>
					<Modal.Title>Sign in</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<FormGroup>
						<Form.Label>Email</Form.Label>
						<Form.Control
						type='email'
						placeholder='Email'/>
						<br/>
						<Form.Label>Password</Form.Label>
						<Form.Control
						type='password'
						placeholder='Password'/>
						</FormGroup>
					</Form>
					<br/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose}> Close </Button>
					<Button variant="outline-primary" onClick={handleClose}> Login </Button>
				</Modal.Footer>
			</Modal>
		</div>
		</>
	)
}

export default Index;