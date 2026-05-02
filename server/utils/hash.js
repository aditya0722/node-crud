const bcrypt = require('bcrypt');


async function verifyPassword (password,hash){
  return await bcrypt.compare(password, hash);
    
}

async function generateHash(password){
   return bcrypt.hash(password,10);
    
}


module.exports={verifyPassword,generateHash}