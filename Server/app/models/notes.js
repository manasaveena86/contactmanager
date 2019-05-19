const mongoose = require('mongoose')
const {Schema} = mongoose
const notesSchema = new Schema({
    text : {
        type : String
    },
    contact : {
        type : Schema.Types.ObjectId,
        ref : 'Contact'
    }
})
const Notes = mongoose.model('Notes',notesSchema)
module.exports = {
    Notes
}