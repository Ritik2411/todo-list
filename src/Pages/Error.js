import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Error.css'

function Error() {
    const navigate = useNavigate()

    return (
        <div className='error-container'>
            <div className='error'>
                <img src='https://cdn2.iconfinder.com/data/icons/business-office-icons/256/To-do_List-512.png' alt='no source' className='logo'/>
                <h1>404 page not found!!!</h1>
                <p className='wrong-url'>You entered wrong URL</p>
                <p onClick={()=>{navigate('/')}} className='error-nav'>Back to home page</p>
            </div>
        </div>
    )
}

export default Error
