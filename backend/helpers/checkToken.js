const jwt = require("jsonwebtoken");
const getToken = require("./getToken");
const jwtSecret = process.env.SECRET_TOKEN;

const checkToken = async (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(422).json({ error: 'Acesso negado!!!' })
    }

    const token = await getToken(req); 
    
    if(!token){
        return res.status(422).json({ error: 'Acesso negado!!' })
    }

    try {

        const verifyToken = jwt.verify(token, jwtSecret);
        
        req.user = verifyToken;
        next();
        
    } catch (error) {
        console.log(error.message)
        return res.status(422).json({ error: 'Token inválido!' })
    } 

}

module.exports = checkToken;