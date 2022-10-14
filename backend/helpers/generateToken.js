const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_TOKEN;

const generateToken = (user)=>{
 
    const token = jwt.sign({
        userId: user._id,
        userName: user.name
    }, jwtSecret, {
        expiresIn: "3d"
    })

    return token;

}

module.exports = generateToken;