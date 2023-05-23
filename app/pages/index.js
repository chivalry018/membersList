import React, { Component, useEffect, useState } from 'react';
import { browserHistory } from 'react-router'
import _ from 'lodash'
import callApi from '../utils/apiCaller';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {Modal,Button, Form,InputGroup, FormGroup, Alert} from 'react-bootstrap'



function Index(props) {
	const [show,setShow] = useState(false)
	const [uname, setUname] = useState('');
  	const [pword, setPword] = useState('');
  	const [error, setError] = useState('');
	const router = browserHistory

	const handleUnameChange = (e) => {
		setUname(e.target.value);
	  };
	
	const handlePwordChange = (e) => {
		setPword(e.target.value);
	  };

	const handleSubmit = async () => {
	
	try {
		const response = await callApi('/login', 'post', {uname, pword});
		if (response.status === 200) {
		// Successful login
		window.alert('Login Successful');
		router.push("/members")
		// Redirect or perform additional actions
		}else {
		setError(response.data.error);
		}
	} catch (error) {
		console.error('Error:',error);
		window.alert('Invalid Credentials')
	}
	};
	  

	const handleOpen = () => setShow(true)
	const handleClose = () => setShow(false)

	const gotoMember =()=>{
		router.push("/members")
	}

	return (
		<>
		<Navbar expand="sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Main</Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="#home">About Us</Nav.Link>
            <Nav.Link onClick={handleOpen}>Member</Nav.Link>&nbsp;&nbsp;&nbsp;&nbsp;
			<Button variant="light" onClick={handleOpen}>Sign In</Button>
          </Nav>
        </Container>
      	</Navbar>

		<div>
		<Modal show={show}  className="dark-modal">
			<Modal.Header closeButton>
				<Modal.Title>Sign in</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form> 
					<FormGroup>
					<label htmlFor="uname">Username:</label>
						<Form.Control
						type='text'
						placeholder='Email'
						onChange={handleUnameChange}
						id="uname"
						name="uname"
						value={uname}/>
						<br/>

					<label htmlFor="pword">Password:</label>
					<Form.Control
						type='password'
						placeholder='Password'
						onChange={handlePwordChange}
						id="pword"
						name="pword"
						value={pword}/>
					</FormGroup>
				</Form>
				<br/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-secondary" onClick={handleClose}> Close </Button>
				<Button variant="outline-primary" onClick={handleSubmit}> Login </Button>
			</Modal.Footer>
		</Modal>
		{error && <p>{error}</p>}
		</div>
		</>
	)
}

export default Index;