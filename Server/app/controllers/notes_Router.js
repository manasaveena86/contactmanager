const express = require('express')
const router = express.Router()
//const {authenticateUser} = require('../middleware/authenticate')
const {Notes} = require('../models/notes')
//const {User} = require('../models/user')
router.post('/:id',(req,res)=>{
    const body=req.body
    const notes = new Notes(body)
    notes.contact = req.params.id
    notes.save()
    .then((note)=>{
        res.send(note)
    })
    .catch((err)=>{
        res.send(err)
    })
})
module.exports = {
    notesRouter:router
}
router.get('/:id',(req,res)=>{
    console.log('notes controller')
    const id=req.params.id
    Notes.findOne({contact:id})
    .then((notes)=>{
        res.send(notes.text)
        console.log(text)
    })
    .catch((err)=>{
        res.send(err)
    })
})
router.get('/',(req,res)=>{
    Notes.find()
    .then((notes)=>{
        res.send(notes)
    })
    .catch((err)=>{
        res.send(err)
    })
})