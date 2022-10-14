import defineConfigReq from "../utils/config"
const api = 'http://localhost:5000/api';

export const getPubliByUser = async (limit, token) => {
    const config = defineConfigReq('GET', null, token);
    if(limit){
        const res = await fetch(`${api}/publi/mypublis?skip=${limit-10}&limit=${limit}`, config)
            .then(res => res.json())
            .catch(err => err);

        return res;
    }
    const res = await fetch(`${api}/publi/mypublis`, config)
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export const deletePubli = async (id, token)=>{
    const config = defineConfigReq('DELETE', null, token);
    const res = await fetch(`${api}/publi/${id}`, config)
        .then(res => res.json())
        .catch(err => err)

    return res;
}

export const createPubli = async (publi, token) => {
    const config = defineConfigReq('POST', publi, token, true);
    const res = await fetch(`${api}/publi/create`, config)
        .then(res => res.json())
        .catch(err => err);

    return res
} 

export const countPublis = async (allPublis, token)=>{
    const config = await defineConfigReq('GET', null, token)

    if(allPublis){
        const res = await fetch(`${api}/publi/count/mypublis?allPublis=true`, config)
            .then(res => res.json())
            .catch(err => err)
        return res
    }
    const res = await fetch(`${api}/publi/count/mypublis?allPublis=false`, config)
        .then(res => res.json())
        .catch(err => err)
    return res
}

export const updatedPubli = async (id, data, token) => {
    const config = await defineConfigReq('PUT', data, token);

    const res = await fetch(`${api}/publi/${id}`, config)
        .then(res => res.json())
        .catch(err => err);
    
    return res;
}

export const getAllPublis = async(limit)=>{
    if(limit){
        const config = await defineConfigReq('GET')
        const res = await fetch(`${api}/publi?skip=${limit-10}&limit=${limit}`, config)
            .then(res => res.json())
            .catch(err => err);

        return res;
    }
    const config = await defineConfigReq('GET')
    const res = await fetch(`${api}/publi`, config)
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export const getPublisUserId = async(id, token)=>{
    const config = await defineConfigReq('GET', null, token)
    const res = await fetch(`${api}/publi/publisUser/${id}`, config)
        .then(res => res.json())
        .catch(err => err);

    return res;
}

export const getPubliId = async(id, token) => {
    const config = defineConfigReq('GET', null, token);

    const res = await fetch(`${api}/publi/${id}`, config)
        .then(res => res.json())
        .catch(err => err)

    return res;
}

export const publiLike = async (publiId, token) => {
    const config = defineConfigReq('PUT', null, token);

    const res = await fetch(`${api}/publi/like/${publiId}`, config)
        .then(res => res.json())
        .catch(err => err);

    return res;

}

export const commentPubli = async (id, comment, token)=>{
    const config = defineConfigReq('PUT', comment, token);
    const res = await fetch(`${api}/publi/comment/${id}`, config)
        .then(res => res.json())
        .catch(err => err)
    
    return res;
}

const publiService = {
    getPubliByUser,
    deletePubli,
    createPubli,
    countPublis,
    updatedPubli,
    getAllPublis,
    getPublisUserId,
    getPubliId,
    publiLike,
    commentPubli,
}

export default publiService;