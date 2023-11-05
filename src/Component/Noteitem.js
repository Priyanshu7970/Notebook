import React,{useContext} from 'react' 
import noteContext from '../Context/notes/Notecontext';

const Noteitem = (props) => { 
    const {note,updateNote} = props;   
    let context = useContext(noteContext); 
    let{deleteNote} = context ;
  const handleDelete = ()=>{
       deleteNote(note._id);   
       props.showAlert('Deleted Successfully','success')  
        
 
  }
  return ( 

    <div className='col-md-3 my-3'>  
        <div className="card" style={{"width": "18rem"}}>
  <div className="card-body"> 
  <div className='d-flex align-items-center'>
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
  </div>
    <p className="card-text">{note.tag}</p> 
   
  </div>
</div>
      
    </div>
  )
}

export default Noteitem
