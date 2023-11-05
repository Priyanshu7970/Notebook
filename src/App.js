
import './App.css';
import {
  BrowserRouter ,
  Routes,
  Route,
  
} from "react-router-dom"; 
import { useState } from 'react';

import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About'; 
import Alert from './Component/Alert';
import NoteState from './Context/notes/NoteState';
import Login from './Component/Login';
import Signup from './Component/Signup';
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (  
    <NoteState>
    <BrowserRouter>
      <Navbar/> 
      <Alert alert={alert}/>
      
      <div className="container">
      <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
          <Route exact path="/about" element={<About />}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>   

           
      </Routes> 
        </div>
        </BrowserRouter>
        </NoteState>

    
  );
}

export default App;
