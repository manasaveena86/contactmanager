const express = require('express')
const router = express.Router()
const {User} = require('../models/user')
const {authenticateUser} = require('../middleware/authenticate')
router.post('/register',(req,res)=>{
    //console.log('entered in register')
    //console.log('body',req.body)
    const body = req.body
    const user = new User(body)
    //instance method which calls on object or document
    user.save()
    .then((user)=>{
        console.log(user)
        res.send({
            user,
            notice : 'successsfull registered'
        })
    })
    .catch((err)=>{
        res.send(err)
    })

})
router.get('/',(req,res)=>{
    User.find()
    .then((users)=>{
        res.send(users)
    })
    .catch((err)=>{
        res.send(err)
    })
})
router.post('/login',(req,res)=>{
    const body = req.body
    console.log('in login',body)
    //static method which calls on class or model
    //console.log('entered in login function')
    User.findByEmailAndPassword(body.email,body.password)
    .then((user)=>{
        console.log('user',user)
        return user.generateToken()
    
    })
    .then((token)=>{
       // res.header('x-auth',token).send()
       res.send({token})
        
    })
    .catch((err)=>{
        res.send(err)
    })
})
router.delete('/logout',authenticateUser,(req,res)=>{
    console.log('entered')
    const token = req.token
    const user = req.user
    //console.log(user)
    var tokensArray=user.tokens
    // for(let i=0;i<tokensArray.length;i++){
    //     if(tokensArray[i].token==token)
    //     {
    //         tokensArray.splice(i,1)
    //         //console.log('deleted')
    // }
    // }
    user.tokens = user.tokens.filter(t => t.token != token )
    user.save()
    .then((user)=>{
        res.send('deleted token')
    })
    .catch((err)=>{
        res.send(err)
    })
})
router.delete('/logoutfromall',authenticateUser,(req,res)=>{
    console.log('entered delete')
    const user = req.user
    console.log(user._id)
    User.findByIdAndUpdate({_id : user._id},{$set:{tokens:[]}},{new : true})
    .then((user)=>{
        res.send({
            user,
            notice : 'logged out'
        })
    })
    .catch((err)=>{

    })
    
    //console.log('deleted')
    //console.log(user)
})

module.exports = {
    userRouter : router
}