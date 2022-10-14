import defineConfigReq from "../utils/config"
const api = 'http://localhost:5000/api';

const savedUserStorage = (data)=>{
    const dataLocalStorage = {
        _id: data._id,
        token: data.token
    }
    localStorage.setItem('user', JSON.stringify(dataLocalStorage));
}

const register = async (user) => {
    try {
        const config = defineConfigReq('POST', user);
        const res = await fetch(`${api}/user/register`, config)
            .then(res => res.json())
            .catch(err => err)
        
        if(res._id){
            savedUserStorage(res);
        }

        return res;
    } catch (error) {
        console.log(error)
    }
    
}

const login = async (user)=>{

    try {
        const config = defineConfigReq('POST', user);

        const res = await fetch(`${api}/user/login`, config)
            .then(res => res.json())
            .catch(err => err);

        if(res._id){
            savedUserStorage(res);
        }

        return res;
    } catch (error) {
        console.log(error)
    }
    
}

const logout = async ()=>{
    localStorage.clear('user');
}

const authService = {
    register,
    login,
    logout,
}

export default authService;