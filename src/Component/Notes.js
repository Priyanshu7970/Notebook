import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem'
import AddNote from './AddNote';
import NoteContext from '../Context/notes/Notecontext';

const Notes = () => {
  let context = useContext(NoteContext);
  let { notes, getNotes,editNote } = context; 
  useEffect(() => {
    getNotes();
    
  }, [])  
  const ref = useRef(null) ;  
  const closeref = useRef(null) ;
  let [note,setnote] = useState({ id: " " ,etitle:"",edescription:"",etag:""}) ; 
  const updateNote  = (currentNote)=>{ 
    ref.current.click(); 
    setnote({ id :currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});

  }
 
  const handleChange = (e)=>{   
    setnote({...note,[e.target.name]:e.target.value})
}   
const handleClick = (e)=>{  
  e.preventDefault();  
  editNote(note.id,note.etitle,note.edescription,note.etag); 
  closeref.current.click();  
  


 
} 
  return (
    <>
      <AddNote />
<button type="button"  className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" onChange={handleChange} minLength={5} required value={note.etitle} name="etitle" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" onChange={handleChange} minLength={5} required  value={note.edescription} id="description" name="edescription"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag"  className="form-label">Tag</label>
    <input type="text" onChange={handleChange} minLength={5} required value={note.etag} className="form-control"  id="tag" name="etag"/>
  </div>
 
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length <5 || note.edescription.length <5}  onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className='container'>
        <h2>Your Notes</h2>  
       <div >
        {notes.length === 0 && "Notes not found"}

        </div>
        <div className="row my-2">
          {
            notes.map((note) => {
              return <Noteitem key={note._id} updateNote={updateNote} note={note} />
            })
          }

        </div>
      </div>
    </>
  )
}

export default Notes
