import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import './Resetpassword.css'

function Resetpassword() {

    const [email,setEmail] = useState('')
    const navigate = useNavigate()

    const reset = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth,email).then(()=>{
            console.log("Reset link send to requested email")
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    return (
        <div className='main-reset-container'>
            <div className='reset-container'>
                <div className='reset-fields'>
                    <img src='https://cdn2.iconfinder.com/data/icons/business-office-icons/256/To-do_List-512.png' alt='no source' className='header-logo'/>
                    <h2 style={{marginTop:'3px',marginBottom:'20px',color:'#007bff'}}>Reset Password</h2>
                    <form onSubmit={reset} style={{width:'100%',marginBottom:'10px'}}>
                        <div className='email-input'>
                            <input type='email' 
                                placeholder='Enter Registered Email' 
                                className='iemail'
                                value={email} 
                                onChange={(e)=>{setEmail(e.target.value)}}
                                required/>
                        </div>

                        <button type='submit' className='reset-submit-btn'>
                            Send reset link
                        </button>
                    </form>   

                    <div>
                        <p style={{color:'#007bff',textDecoration:'underline',cursor:'pointer'}}
                            onClick={()=>{navigate('/login')}}
                        >
                            Back to Login
                        </p>
                    </div>               
                </div>
            </div>
        </div>
    )
}

export default Resetpassword
