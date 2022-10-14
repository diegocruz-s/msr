import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

const useUserAuth = () => {
    const { user } = useSelector((state) => state.auth);

    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);

        if(user){
            setAuth(true)
        }else{
            setAuth(false)
        }

        setLoading(false);
    }, [user])

    return { auth, loading }

}

export default useUserAuth;