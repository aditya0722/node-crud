const pool = require("../../config/db");

const getUsers=async(req, res)=>{
   try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const deleteUser=async(req,res)=>{
    
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
const updateUser=async(req,res)=>{
    console.log(req);
    
    const {name,email}=req.body;
    const {id}=req.params;
    if(!id){
        return res.status(400).json({message:"user id is required"})
    }

    if(!name && ! email){
        return res.status(400).json({message:"name or email are requied"})
    }
    try{
        const result=await pool.query(" UPDATE users SET name=COALESCE($1,name),email=COALESCE($2,email) WHERE id=$3 RETURNING *",[name || null,email || null,id]);
    if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
    return res.status(200).json({ message: 'User Update successfully' });
    }
    catch(e){
        console.log(e);
        
        return res.status(500).json({message:"Internal Server Error"})
    }
    
}

module.exports={getUsers,deleteUser,updateUser}