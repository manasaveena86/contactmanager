const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

const path = require('path')
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(express.json())
app.use(cors())
const {contactRouter} = require('./app/controllers/contacts_controller.js')
const {userRouter}= require('./app/controllers/users_controller')
const {notesRouter} =require('./app/controllers/notes_Router')
 require('./config/database.js')

app.get('/',(req,res)=>{
    res.send('Welcome to the contact manager')
})
app.use('/contact',contactRouter)
app.use('/user',userRouter)
app.use('/notes',notesRouter)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })  

app.listen(port,()=>{
    console.log('Server up listening to the port',port)
})

