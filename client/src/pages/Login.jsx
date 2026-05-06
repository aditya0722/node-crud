import React from "react";
import '../App.css'
import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        if (!email || !password) {
            alert("not availabe")
            return;
        }
        try {
            const response = await fetch("http://13.55.38.20:3000/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            })
            
            const data = await response.json();

            if (!response.ok) {
            
               throw new Error(data.message || 'Login failed');
            }
            if(!data.token){
                throw new Error(data.message || 'Login failed');    
            }
            localStorage.setItem('token', data.token);
            navigate('/home');
           
        } catch (e) {
            console.error(e)
            alert(e.message);
        }
    }
    return (
        <div className="login-wrapper">
            <div className="login-box">
                <h1>Login</h1>

                <form className="login-form">
                    <div className="input-group">
                        <label>email</label>
                        <input type="text" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} placeholder="Enter your email" />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={formData.value} onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} placeholder="Enter your password" />
                    </div>

                    <button type="submit" onClick={onSubmit} className="login-btn">
                        Login
                    </button>
                </form>

                <p className="signup-text">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
}