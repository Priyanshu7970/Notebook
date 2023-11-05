
import React ,{ useState } from 'react';
import Notecontext from './Notecontext'; 
const NoteState = (props) => { 
  const port = "http://localhost:5000";
    let notesinitial = []
      let [notes,setnotes] = useState(notesinitial) ;  

      // addNote
      const addNote = async(title, description, tag)=>{  
        const response = await fetch(`${port}/api/notes/addnotes`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}),
        }) 
        const json = await response.json();
        setnotes(notes.concat(json));
      }  
      // getnote
      const getNotes = async()=>{ 
        const response = await fetch(`${port}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          }, 
        });  
        const json = await response.json(); 
        setnotes(json);
          
      }
      // deleteNote 
      const deleteNote = async(noteid)=>{
           const response = await fetch(`${port}/api/notes/deletenote/${noteid}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
          });
          const json =  response.json(); 
           let newnotes = notes.filter((note)=>{
             return note._id !==noteid ;
           }) 
           setnotes(newnotes);
      }  

      // edit Note  
      const editNote = async(id,title, description,tag)=>{ 
        const response = await fetch(`${port}/api/notes/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}),
        }); 
        const json = await response.json() ;  
        let newnotes = JSON.parse(JSON.stringify(notes))
          for( let index = 0 ;index<notes.length ; index++){
               const element = notes[index]; 
               if(element._id === id){
                newnotes[index].title = title ;
                newnotes[index].description = description ;
                newnotes[index].tag = tag ;
                break ;
               }
          } 
          setnotes(newnotes);
           
      }
  return (   
    <Notecontext.Provider value = {{notes,addNote,deleteNote,editNote,getNotes}}> 
        {props.children}
    </Notecontext.Provider>
  )
}

export default NoteState;
