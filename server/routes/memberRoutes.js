import express from 'express'
import * as memberCtlr from '../controllers/memberCtlr'

var memberRoutes = express.Router()

memberRoutes.post('/member/save', function(req, res){
    memberCtlr.saveMember(req.body, res)
})

memberRoutes.get('/member/list', function(req, res){
    memberCtlr.getAllMembers(res)
})

memberRoutes.get('/member/edit/:id', function(req, res){
    memberCtlr.getMember(req.params.id, res)
})

memberRoutes.post('/member/update/', function(req, res){
    memberCtlr.updateMember(req.body, res)
})

memberRoutes.get('/member/delete/:id', function(req, res){
    memberCtlr.deleteMember(req.params.id, res)
})

memberRoutes.get('/member/list', function(req, res){
    memberCtlr.getAllMembers(res)
})

memberRoutes.post('/login', (req, res) => {
    const { uname, pword } = req.body;
    memberCtlr.loginMember(uname, pword, res);
})


export default memberRoutes