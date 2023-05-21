import React, { Component, useEffect, useState } from 'react';
import { browserHistory } from 'react-router'
import callApi from '../../utils/apiCaller'
import _ from 'lodash'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Select from 'react-select'
import { FormControl, FormGroup } from 'react-bootstrap';

const initForm = {
    employee_id: "",
    fname: "",
    lname: "",
    mname: "",
    gender:"",
    status:"",
    uname:"",
    pword:"",
    bday:""
}

const gender = [
	{value: 'Female', label: 'Female'},
    {value: 'Male', label: 'Male'}
  ];

const status = [
    {value: 'Single', label: 'Single'},
    {value: 'Married', label: 'Married'},
    {value: 'Widowed', label: 'Widowed'}
]

function Add(props) {

    const router = browserHistory
    const [ form , setForm ] = useState(initForm)
    const [id, setId] = useState("")
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);


    useEffect(()=>{
        if (!_.isEmpty(props.params.id)){
            setId(props.params.id)
            getMember(props.params.id)
        }
    },[])

    async function getMember(id){
        try{
            const ret = await callApi('member/edit/'+id)
            if (ret.status==200){
                setForm(ret.data)
                setSelectedGender(ret.data.gender)
                setSelectedStatus(ret.data.status)
            }

        }catch(error){
            console.log(error)
        }

    }
  
    const handleCancel =()=>{
        router.push("/members")
    }

    const isFormValid = () => {
        return (
          form.employee_id !== "" &&
          form.fname.trim() !== "" &&
          form.lname.trim() !== "" &&
          form.mname.trim() !== ""
        )
      }
    
      const handleFormSubmit = (e) => {
        e.preventDefault(); 
        if (isFormValid()) {
          handleSave();
        } else {
          window.alert("Please fill in all fields."); 
        }
      }

    const handleSave = async ()=>{
        // router.push("/members")
        if (!_.isEmpty(props.params.id)){
            // edit
            try{
                const ret = await callApi('member/update', 'post', form)
                console.log(ret)
                if (ret.status==200){
                    router.push("/members")
                }
    
            }catch(error){
                console.log(error)
            }
        }else{
            // add
            try{
                const ret = await callApi('member/save', 'post', form)
                console.log(ret)
                if (ret.status==200){
                    router.push("/members")
                }
    
            }catch(error){
                console.log(error)
            }

        }
        
    };

    const handleChange = (e)=>{
        var tmp = Object.assign({}, form, {
            [e.target.name] : e.target.value
        })
        setForm(tmp)
        handleGender(e)
        handleStatus(i)
    };

    const handleGender = (e) => {
        //setSelectedGender(e.target.value);
        const {name,value} = e.target;
        if(name === "gender"){
            setSelectedGender(value);
        } 
        else{
            setForm((prevForm) => ({
                ...prevForm,
                [name]:value
            }))
        }
    };

    const handleStatus = (i) => {
        setSelectedStatus(i.target.value);
    };

    return (
		<div className='inp'>
            <Card style={{width:'30rem',height:'41rem',alignItems:'center'}}>
                <div className='col-12'>
                    <br/>
                    <h2>{_.isEmpty(id)?"Add Member":"Edit Member"}</h2>
                    <Form onSubmit={handleSave} style={{width:'100%'}}>
                    <br></br>
                        <FormGroup>
                            <Form.Label>Employee ID</Form.Label>
                                <FormControl type='text' placeholder='ID' id="id"
                                        name="employee_id" 
                                        value={form.employee_id}
                                        onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>       
                            <Form.Label>First Name</Form.Label>
                                <FormControl type='text' placeholder='Juan' id="firstname" 
                                        name="fname"
                                        onChange={handleChange}
                                        value={form.fname}/>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Last Name</Form.Label>
                                <FormControl type='text'placeholder='Dela Cruz' id="lastname" 
                                        name="lname"
                                        onChange={handleChange}
                                        value={form.lname}
                                        className='form-control'/>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Middle Name</Form.Label>
                                <FormControl type='text'placeholder='M.I.' id="mname" 
                                        name="mname"
                                        onChange={handleChange}
                                        value={form.mname}
                                        className='form-control'/>
                        </FormGroup>
                        <FormGroup>       
                            <Form.Label> Status
                                <select
                                name="status"
                                value={form.status}
                                className='form-control'
                                onChange={handleChange}>
                                    {status.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                        ))}
                                </select>
                            </Form.Label>
                            <Form.Label className='bdayLabel'> Birth Date
                                <input type='date' placeholder='Birth Date' id="bday" 
                                        name="bday"
                                        onChange={handleChange}
                                        value={form.bday}
                                        className='form-control'>
                                </input>
                            </Form.Label>
                            <Form.Label className='genderLabel'>Gender:</Form.Label>
                                <div className='genderRadio'>
                                    {gender.map((gender) => (
                                    <Form.Label key={gender.value}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender.value}
                                        checked={selectedGender === gender.value}
                                        onChange={handleChange}
                                    />
                                    {gender.label}
                                    </Form.Label>
                                    ))} 
                                </div>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Username</Form.Label>
                            <FormControl type='text' placeholder='Username' id="uname" 
                                    name="uname"
                                    onChange={handleChange}
                                    value={form.uname}
                                    className='form-control'/>
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Password</Form.Label>         
                            <FormControl type='text' placeholder='Password' id="pword" 
                                    name="pword"
                                    onChange={handleChange}
                                    value={form.pword}
                                    className='form-control'/>
                        </FormGroup>              
                    </Form>
                    <div className='btns'>
                        <button className='btn btn-danger' style={{width:'6rem'}} onClick={handleCancel}>Cancel</button>&nbsp;&nbsp;
                        <button className='btn btn-success' style={{width:'8rem'}} onClick={handleFormSubmit}>Save</button>
                    </div>
                </div>
            </Card>
	    </div>
	)

}

export default Add