
const pool = require('../../config/db');
const bcrypt =require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const {getUserByEmail,createUser}=require("../auth/auth.model");

const userLogin=async(req,res)=>{
     const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        
        const user = await getUserByEmail(email) ;
        //checkinf the user is present or not
        if (!user) {
            return res.status(401).json({ message: 'Email not found' });
        }

        const verifyPassword = await bcrypt.compare(password, user.password);
        //if password is not correct
        if (!verifyPassword) {
            return res.status(401).json({ message: 'Invalid credentials', result: result.rows });
        }
        //generating the token
        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const userRegister=async(req,res)=>{
    try {
        const { name, email, password } = req.body;
        if (!email || !name || !password) {
            res.status(403).json({ message: "enter all the required feilds" })
        }

        const user = await getUserByEmail(email);

        if (user) {
            return res.status(403).json({ message: "User Already Exits" })
        }

        const hash = await bcrypt.hash(password, 5)

        const result=await createUser(name,email,hash);
        if(!result){ 
            throw new Error({message:"something went wrong"});
        }
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log(err);

        res.status(500).json({ error: 'Internal Server Error', err });
    }
}
module.exports={userLogin,userRegister}