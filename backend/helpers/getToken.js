const getToken = (req)=>{
    
    const autorization = req.headers.authorization;
    const token = autorization.split(' ')[1];
    
    return token
}
 
module.exports = getToken;