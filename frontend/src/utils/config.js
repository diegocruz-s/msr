const defineConfigReq = (method, data, token=null, img=null)=>{
    let config = ''
    
    if(img){
        config = {
            method: method,
            headers: {},
            body: data
        }
    }else if(method === 'DELETE' || !data){
        config = {
            method: method,
            headers: {}
        }
    }else{
        config = {
            method: method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    }

    if(token){
        config.headers.authorization = `Bearer ${token}`
    }

    return config;
}

export default defineConfigReq;