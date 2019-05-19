const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {Contact} = require('../models/contact.js')
const {User} = require('../models/user')
const jwt = require('jsonwebtoken')
router.get('/',authenticateUser,(req,res)=>{
    Contact.find({user: req.user._id})
    .then((contacts)=>{
        res.send(contacts)
    })
    .catch((err)=>{
        res.send(err)
    })
})
//route to fetch single contact information
router.get('/:id',authenticateUser,(req,res)=>{
    const id = req.params.id
    Contact.findOne({_id:id,user:req.user._id})
    .then((contact)=>{
        if(contact){//if contact is present
        res.send(contact)}
        else{//contact not preent then value is null
            res.send({})
        }
    })

    .catch((err)=>{
        res.send(err)
    })
})
router.put('/:id',authenticateUser,(req,res)=>{
    const id = req.params.id
    const body = req.body
    Contact.findOneAndUpdate({_id:id,user:req.user._id},{ $set :body},{new:true})
    .then((contact)=>{
        res.send(contact)
    })
    .catch((err)=>{
        res.send(err)
    })
})
function authenticateUser(req,res,next){
    const token = req.header('x-auth')
    if(token){
    User.findByToken(token)
    .then((user)=>{
        req.user = user
        req.token = token
        next()
    })
    }
    else{
        res.send('token not provided')
    }
}

//route to create a contact
router.post('/',authenticateUser,(req,res)=>{
    const body = req.body
    const contact = new Contact(body)
    contact.user = req.user._id
    contact.save()
    .then((contact) => {
        res.send(contact)
    })
    .catch((err)=>{
        res.send(err)
    })
})
router.delete('/:id',authenticateUser,(req,res)=>{
    const _id = req.params.id
    Contact.findOneAndDelete({_id,user:req.user._id})
        .then((contact)=>{
            if(contact){
                res.send(contact)
            }
            else{
                res.send({})
            }
        })
        .catch((err)=>{
            res.send(err)
        })
})
module.exports = {
    contactRouter : router
}