const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE-1 : Get all the notes using: GET "/api/notes/createuser" (Login required)
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error :(");
    }
});

// ROUTE-2 : Add a new note using: POST "/api/notes/addnote" (Login required)
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid Title :(').isLength({ min:3 }),
    body('description', 'Description must be at least 5 characters :(').isLength({ min:5 })
], async (req, res)=>{
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array() });
        }
    
        const note = new Note({
            title, description, tag, user:req.user.id
        });
        const savedNote = await note.save();
    
        res.json(savedNote);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error :(");
    }
});

// ROUTE-3 : Update an existing note using: PUT "/api/notes/updatenote" (Login required)
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found :(");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed :(");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true});
        res.json({note});
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error :(");
    }
});

// ROUTE-4 : Delete an existing note using: DELETE "/api/notes/deletenote" (Login required)
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found :(");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed :(");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note successfully deleted :)", note:note});
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error :(");
    }
});

module.exports = router