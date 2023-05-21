import mongoose from 'mongoose'

const Schema = mongoose.Schema
const memberSchema = new Schema({
    employee_id: Number,
    fname: {type:'String'},
    lname: {type:'String'},
    mname: {type:'String'},
    gender: {type:'String'},
    status: {type:'String'},
    uname: {type:'String'},
    pword: {type:'String'},
    bday : {type:'String'}
}, {toJSON:{ virtuals:true}})

export default mongoose.model('member', memberSchema)