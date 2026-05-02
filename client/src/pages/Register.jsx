import React from "react";
import '../App.css';
import { Link } from "react-router-dom";
export default function Register() {  
   const [formData,setFormData] = React.useState({
    name:"",
    email:"",
    password:""
   })

   const onSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = formData;
    if(!name || !password || !email){
        alert('name and email and password  are required');
        return;
    }
    try{ 
      const response=  await fetch("http://localhost:3000/auth/register", {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name:name,email:email,password:password}) 
            })
        if(response.ok){
            alert('User registered successfully');
        }else{
            const data=await response.json();
            alert(data.message || 'Registration failed');
        }

    }catch(err){
        alert('An error occurred during registration');
    }

    }



   

    return (
        <div className="login-wrapper">
      <div className="login-box">
        <h1>Register</h1>

        <form className="login-form">
          <div className="input-group">
            <label>name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Enter your name" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Enter your password" />
          </div>

          <button type="submit" className="login-btn" onClick={onSubmit}>
            Register
          </button>
        </form>

        <p className="signup-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
    ) 
}