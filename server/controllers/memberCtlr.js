import { func } from 'prop-types'
import Member from '../models/member'

var ObjectId = require('mongoose').Types.ObjectId

export function saveMember(body, res){

    const savetoDb = function(){
        return new Promise(function (resolve, reject){
            var params = {
                employee_id: body.employee_id,
                fname: body.fname,
                lname: body.lname,
                mname: body.mname,
                gender: body.gender,
                status: body.status,
                uname: body.uname,
                pword: body.pword,
                bday: body.bday
            }
            var newmember = Member(params)
            newmember.save((err, obj) => {
                resolve()
            })
        })
    }

    savetoDb()
    .then(() => {
        res.json({status:200})
    })
    .catch((error) => {
        res.json({status:400})
    })
}


export function getAllMembers(res){

    var list = []

    const fetchMembers = function(){
        return new Promise(function (resolve, reject){
           Member.find()
           .exec((err, result)=>{
                if (err){
                    console.log(err)
                    reject()
                }else{
                    list = result;
                    resolve()
                }
           })
        })
    }

    fetchMembers()
    .then(() => {
        res.json({status:200, data: list})
    })
    .catch((error) => {
        res.json({status:400})
    })
}

export function getMember(id, res){

    var data = null

    const fetchMembers = function(){
        return new Promise(function (resolve, reject){
           Member.findOne({employee_id: id})
           .exec((err, result)=>{
                if (err){
                    console.log(err)
                    reject()
                }else{
                    data = result;
                    resolve()
                }
           })
        })
    }

    fetchMembers()
    .then(() => {
        res.json({status:200, data: data})
    })
    .catch((error) => {
        res.json({status:400})
    })
}

export function updateMember(body, res){

    const savetoDb = function(){
        return new Promise(function (resolve, reject){
            var params = {
                employee_id: body.employee_id,
                fname: body.fname,
                lname: body.lname,
                mname: body.mname,
                gender: body.gender,
                status: body.status,
                uname: body.uname,
                pword: body.pword,
                bday: body.bday
            }
            Member.findByIdAndUpdate(new ObjectId(body._id), params)
            .exec((err, result)=>{
                if (err){
                    console.log(err)
                    reject()
                }else{
                    resolve()
                }
           })
        })
    }

    savetoDb()
    .then(() => {
        res.json({status:200})
    })
    .catch((error) => {
        res.json({status:400})
    })
}

export function deleteMember(id, res){

    const savetoDb = function(){
        return new Promise(function (resolve, reject){
            Member.findByIdAndDelete(new ObjectId(id))
            .exec((err, result)=>{
                if (err){
                    console.log(err)
                    reject()
                }else{
                    resolve()
                }
           })
        })
    }

    savetoDb()
    .then(() => {
        res.json({status:200})
    })
    .catch((error) => {
        res.json({status:400})
    })
}

export function loginMember(uname,pword,res){

    const fetchMembers = () => {
        return new Promise((resolve, reject) => {
            Member.findOne({ uname: uname, pword: pword })
            .exec((err, member) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
              } else if (!member) {
                res.status(401).json({ error: 'Invalid credentials'});
              } else {
                res.status(200).json({ message: 'Login successful', status:200 , data: member });
              }
            });
        });
      };
    

    fetchMembers()
    .then(() => {
        res.json({status:200,  data: list })
    })
    .catch((error) => {
        res.json({status:400})
    })
}