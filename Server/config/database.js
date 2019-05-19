const mongoose = require('mongoose')
//db configuration

//telling mongoose to use es6's promise library
mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/contact-manager'
console.log(CONNECTION_URI)
mongoose.connect(CONNECTION_URI,{ useNewUrlParser: true })
.then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log('error in connection',err)
})
//mongodb+srv://manasaveena:sgdmvd99@cluster0-kclqe.mongodb.net/contact-manager?retryWrites=true
//mongodb://localhost:27017/contact-manager-nov