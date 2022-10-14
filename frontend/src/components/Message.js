import { useEffect, useState } from 'react';
import './Message.css';

const Message = ({ msg, isMsg })=>{

    const [showElement, setShowElement] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setShowElement(false)
        }, 3000)
    }, [])

    return(
        <>
            {showElement && (
                <div className={`${isMsg} message`}>
                    <p>{ msg }</p>
                </div>
            )}
        </>
        
    )
    
}

export default Message;