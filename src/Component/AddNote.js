import React,{useContext, useState} from 'react'  
import noteContext from '../Context/notes/Notecontext'

const AddNote = () => {  
  let context = useContext(noteContext);
  let {addNote} = context;
    
  let [note,setNote] = useState({title:"",description:"",tag:""})   
    
    const handleChange = (e)=>{ 
        setNote({...note,[e.target.name]:e.target.value})
    }   
    const handleClick = (e)=>{  
      e.preventDefault(); 
      addNote(note.title,note.description,note.tag);  
      setNote({title:" ",description:" ",tag:" "})
        
        
    } 
     
  return (
    <div>
    <div className='container my-3'>
       <h2>Add Note</h2> 
       <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" value={note.title} id="title" onChange={handleChange} name="title" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" value={note.description} onChange={handleChange} id="description" name="description"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag"  className="form-label">Tag</label>
    <input type="text" onChange={handleChange} value={note.tag} className="form-control"  id="tag" name="tag"/>
  </div>
 
  <button disabled={note.title.length <5 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div> 
 </div>
  )
}

export default AddNote
