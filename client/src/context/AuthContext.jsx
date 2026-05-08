import { useContext,useState,useEffect,} from "react";
import { useNavigate } from "react-router-dom";

import React from "react";
import { setAccessToken } from "../api/auth";
const AuthContext = React.createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    
    const login = async (email,password) => {
        
        const response = await fetch("api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
        if(!response.ok) throw new Error(data.message || "Login failed");
        const data = await response.json();
        if(!data.accessToken) throw new Error(data.message || "Login failed");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        return data;
    };
        

  

    const logout = () => {
        const response = fetch("api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        if(!response.ok) throw new Error("Logout failed");
        localStorage.removeItem("user");
        setUser(null);
        setAccessToken("");
        navigate("/");
    };


  return <AuthContext.Provider value={{ user, login, logout }}>
    {children}
  </AuthContext.Provider>   
};

export default AuthContext;