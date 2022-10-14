const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = process.env.SECRET_TOKEN;

const getUserByToken = async (token)=>{
    
    if(!token){
        return res.status(422).json({ error: 'Acesso negado!' })
    }

    try {

        const verifyToken = jwt.verify(token, jwtSecret);
        const user = await User.findById(verifyToken.userId);
 
        return user;

    } catch (error) {
        return res.status(422).json({ error: 'Token inválido!' }) 
    }
    
}

module.exports = getUserByToken;