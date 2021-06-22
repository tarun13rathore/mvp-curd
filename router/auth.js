const express = require("express");
require('../db/conn');
const router = express.Router();
const Note = require("../model/noteSchema");

//Async---await insert data
router.post('/notes', async(req,res) => {
    const {course, note1, note2, note3}=req.body;

    if(!course || !note1 || !note2 || !note3 ){
           return res.status(422).json({error:"plaese fill all property"})
    }

    try{
        const courseExist = await Note.findOne({course:course})
        if(courseExist){
            return res.status(422).json({error:"Course Allready Exist.."})  
           }else{
            const note = new Note({course, note1, note2, note3});
            await note.save();
           res.status(201).json({message:"Note Resgister Sucessfully.."});
           }
    }catch(err){
        console.log(err)
    }
})

//read data using async and await.. 
router.get("/notes",async(req,res) =>{
    try{
        const allData = await Note.find();
        res.status(201).send(allData);
    }catch(e){
        res.status(400).send(e);
    }    
}) 

//update data by id using async and await.. 
router.put("/notes/:id",async(req,res) =>{
    try{
        const _id =req.params.id;
        const updateData = await Note.findByIdAndUpdate(_id,req.body,{
            new:true
        });
               res.status(201).send(updateData);
    }catch(e){
        res.status(400).send(e);
    }    
})
//Delete data by id using async and await.. 
router.delete("/notes/:id",async(req,res) =>{
    try{
        const deleteNote = await Note.findByIdAndDelete(req.params.id); 
        if(!req.params.id){
            return res.status(404).send();
        }else{
            res.status(410).send(deleteNote);
        }
    }catch(e){
        res.status(400).send(e);
    }    
})

module.exports=router;