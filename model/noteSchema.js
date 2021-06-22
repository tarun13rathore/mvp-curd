const mongoose =require("mongoose");

const noteSchema = new mongoose.Schema({
    course:{
        type:String,
        required:true
    },
    note1:{
        type:String,
        required:true
    },
    note2:{
        type:String,
        required:true
    },
    note3:{
        type:String,
        required:true
    },

})
const Note =mongoose.model("NOTE",noteSchema);

module.exports = Note;