import React ,{useState} from 'react' 
import {useNavigate} from 'react-router-dom'
const Signup = () => { 
  let navigate = useNavigate();  
  let [credentials,setcredential] = useState({name:"",email:"",password:"",cpassword:""}) ;
  const handleChange = (e)=>{
    setcredential({...credentials,[e.target.name]:e.target.value})
  } 
  const handleSubmit = async(e)=>{ 
    e.preventDefault(); 
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),
    })  
    const json = await response.json();  
    console.log(json);
    console.log(json); 
    if(json.success){
      //save the auth token and redirect  
      localStorage.setItem('token',json.authtoken) 
      navigate('/');


    } 
    else{
      alert('Invalid credentails')
    }
      
  } 
  return ( 
    <div> 
      <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" value={credentials.name} onChange={handleChange} name="name" aria-describedby="emailHelp"/>

  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" onChange={handleChange} value={credentials.email} name='email' id="email"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={handleChange} value={credentials.password} name='password' id="password" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" name='cpassword' onChange={handleChange} value={credentials.cpassword} className="form-control" id="cpassword" minLength={5} required/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div> 

  )
}

export default Signup
