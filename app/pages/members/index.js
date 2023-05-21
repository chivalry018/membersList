import React, { Component, useEffect, useState } from 'react';
import { browserHistory } from 'react-router'
import callApi from '../../utils/apiCaller'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

function Index(props) {
	
	const router = browserHistory
	const [show,setShow]=useState(false)
	const [firstname, setfirstname] = useState('');
	const [lastname, setlastname] = useState('');
	const [id, setId] = useState(''); 
	const [users, setUsers] = useState([]);	
	const [idToDelete, setidToDelete] = useState(''); 
	
    useEffect(()=>{

        getList()
    },[])

    async function getList(){
        try{
            const ret = await callApi('member/list')
            if (ret.status==200){
                setUsers(ret.data)
            }

        }catch(error){
            console.log(error)
        }

    }

	const gotoMember =()=>{
		router.push("/main")
	}

    const handleEdit =(id)=>{
		router.push("/editmember/"+id)
	}


	const handleDelete =async (id)=>{
		
		setidToDelete(id)
		setShow(true)
	
	}

    const handleGoDelete =async ()=>{
		console.log(idToDelete)
		try{
			const ret = await callApi('member/delete/'+idToDelete)
			if (ret.status==200){
				getList()
				setShow(false)
			}

		}catch(error){
			console.log(error)
		}
		
	}
	
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	return (
		<>
		<div >
        <Button variant="link" className='btn-back' onClick={()=>router.push("/main")}>Back</Button>
        <Button variant="outline-success" className='btn-add' onClick={()=>router.push("/addmember")}>Add Member</Button>
			<Table striped bordered hover variant='light' className='table' style={{textAlign:'center'}}>
			<thead>
				<tr>
				<th>ID</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Middle Name</th>
				<th>Username</th>
				<th>password</th>
				<th>Gender</th>
				<th>Status</th>
				<th>Birth Date</th>
                <th>Action</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
				<tr>	
				<td>{user.employee_id}</td> 
				<td>{user.fname}</td>
				<td>{user.lname}</td>
				<td>{user.mname}</td>
				<td>{user.uname}</td>
				<td>{user.pword}</td>
				<td>{user.gender}</td>
				<td>{user.status}</td>
				<td>{user.bday}</td>
                <td><Button variant='outline-primary' onClick={()=>handleEdit(user.employee_id)}>Edit</Button>&nbsp;&nbsp;&nbsp;
					<Button variant='outline-danger' onClick={()=>handleDelete(user._id)}>Delete</Button>
					</td>
				</tr>
		    	))}
			</tbody>
			</Table>
			<Modal show={show}  className="dark-modal">
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose}> Close </Button>
					<Button variant='outline-danger' onClick={handleGoDelete}>Delete</Button>	
				</Modal.Footer>
			</Modal>
		</div>
		</>
	)
}

export default Index;