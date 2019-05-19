const mongoose = require('mongoose')
const validator = require('validator')
const {Schema} = mongoose
const contactSchema = new Schema({
    //all fields,its types,and its validations
    name:{
        type: String,
        required: true,
        minlength : 3,
        maxlength : 128
    },
    email : {
        type : String,
        validate : {
            validator : function(value){
                if(value.length==0){
                    return true
                }
                return validator.isEmail(value)
            },
            message : function(){
                return 'invalid email format'
            }
        }
        
    },
    mobile : {
        type : String,
        required : true,
        minlength : 10,
        maxlength : 10,
        validate : {
            validator : function(value){
                return validator.isNumeric(value)
            }
        },
        message : function(){
            return 'invalid mobile number'
        }
    },
    website : {
        type : String,
        
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})
//argument Contact in model is the model name 
const Contact = mongoose.model('Contact',contactSchema)
module.exports={
    Contact
}