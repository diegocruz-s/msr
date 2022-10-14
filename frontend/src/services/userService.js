import defineConfigReq from "../utils/config";
const api = 'http://localhost:5000/api';
export const imgsSaves = 'http://localhost:5000/imgsSaves';

export const getUserByToken = async (token)=>{
    const config = await defineConfigReq('GET', null, token);

    const res = await fetch(`${api}/user`, config)
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export const updateUser = async (newUser, token)=>{
    const config = defineConfigReq('PUT', newUser, token, true);

    const res = await fetch(`${api}/user`, config)
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export const getUserById = async (id, token) => {
    const config = await defineConfigReq('GET', null, token);
    const res = await fetch(`${api}/user/${id}`, config)
        .then(res => res.json())
        .catch(err => err);
        
    return res;
}

const userService = {
    getUserByToken,
    updateUser,
    getUserById,
}

export default userService;