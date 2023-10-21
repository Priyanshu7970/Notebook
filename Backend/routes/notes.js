const express = require('express'); 
const router = express.Router()  
const Note = require('../models/Note')  
var fetchuser = require('../middilware/fetchuser'); 
const { body, validationResult } = require('express-validator');
// Route 1: Get All the Note using GET request :"api/auth/fetchallnotes". Login required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{    
    try {
    const notes =  await  Note.find({user:req.user.id}) 
    res.json(notes)
} catch (error) { 
    console.log(error)  
    res.status(500).send("Internal server error")

        
}
})  
// Route 2: add the new Note using POST request :"api/auth/addnotes".  Login required
router.post('/addnotes',fetchuser, [
    body('title','Enter a valid title').isLength({min:3}), 
    body('description','Enter the valid description').isLength({ min: 5 })
],async (req,res)=>{     
    try {
    const errors = validationResult(req)  
    if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()})
    } 
    const {title, description, tag} = req.body ; 
    const note = new Note({
        title,description,tag, user:req.user.id 
    }) 
    const savenote = await note.save();  
    res.json(savenote) 
} 
catch(error){ 
    console.error(error.message) 
     res.status(500).send("Internal server error")

}

})   
// Route 3: update the  old  Note using POST request :"api/auth/updatenote".  Login required 
router.put('/updatenote/:noteid',fetchuser,async(req,res)=>{
 try{
     let newnote = {} ;  // Humne isse blank issliye rakha hai kyuki humko nahi pata user kya kya update karega 
     let {title,description,tag} = req.body ; // this three that user can change on his note maybe one or two we don't know 
     if(title){newnote.title = title} 
     if(description){newnote.description = description} 
     if(tag){newnote.tag = tag} 
     let note  = await Note.findById(req.params.noteid); 
     if(!note){
        return res.status(400).send('Page not found')
     }   
    
     if(note.user.toString() !== req.user.id){
        return res.send('Unauthorized user');
     }  
     note = await  Note.findByIdAndUpdate(req.params.noteid,{$set:newnote},{new:true})  
    res.json({note})
      
 }
 catch(error){
    console.log(error);
    res.send('Internal server error')
 }

}) 
// Deleting the  existing Note using post request   
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{  
    try{
        let note =await Note.findById(req.params.id); 
        if(!note){
            return res.status(404).send("Note not found") 
        }  
        if(note.user.toString() != req.user.id){ 
             return res.status(401).send("Unauthorized user for deletion");
        } 
        note = await Note.findByIdAndDelete(req.params.id); 
        res.send("The note is deleted successfully"); 
        

    } 
    catch(error){
        console.log(error);
        res.status(400).send('Internal server error')
    }
    

})

module.exports = router 