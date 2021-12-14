import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import db, { auth } from '../Firebase'
import './Register.css'

function Register() {

    const [username,setName] = useState('')
    const [dob,setDob] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [conformpass,setConformpass] = useState('')
    const navigate = useNavigate()

    const register = (e) => {
        e.preventDefault()
        if(password !== conformpass){
            alert("Password do not match")
        }

        else{
            createUserWithEmailAndPassword(auth,email,password).then(async(res)=>{
                await setDoc(doc(db,"user",`${res.user.uid}`),{
                    username:username,
                    dob:dob,
                    email:email
                }).then(()=>{
                    console.log("data added succesfully")
                    navigate('/login')
                }).catch(err=>{
                    console.log(err.message)
                })
            }).catch(err=>{
                alert(err.message)
            })            
        }

    }

    return (
        <div>
            <div className='main-register-container'>
                <div className='register-container'>
                    <div className='register-fields'>
                        <div style={{display:'flex'}}>
                            <img src='https://cdn2.iconfinder.com/data/icons/business-office-icons/256/To-do_List-512.png' alt='no source' className='header-logo'/>
                            &nbsp;<h2 style={{marginBottom:'20px',color:'#007bff'}}>Register</h2>
                        </div>
                        
                        <form onSubmit={register} style={{width:'100%',marginBottom:'10px'}}>
                            <div>
                                <input type="text" 
                                    placeholder='Enter Name' 
                                    className='name'
                                    value={username}
                                    onChange={e=>setName(e.target.value)} 
                                    required/>
                            </div>

                            <div style={{display:'flex'}}>
                                <p style={{marginTop:'8px'}}>Enter DOB:&nbsp;</p>
                                <input type='date' 
                                    placeholder='Enter DOB' 
                                    className='dob' 
                                    value={dob}
                                    onChange={e=>setDob(e.target.value)}    
                                    required
                                />
                            </div>

                            <div className='email-input'>
                                <input type='email' 
                                    placeholder='Enter Email' 
                                    className='iemail'
                                    value={email} 
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                    required/>
                            </div>

                            <div className='password-input'>
                                <input type="password" 
                                    placeholder='Enter Password' 
                                    className='ipassword'
                                    value={password} 
                                    onChange={(e)=>{setPassword(e.target.value)}}
                                    required/>
                            </div>

                            <div className='password-input'>
                                <input type="password" 
                                    placeholder='Enter Password Again' 
                                    className='ipassword'
                                    value={conformpass} 
                                    onChange={(e)=>{setConformpass(e.target.value)}}
                                    required/>
                            </div>

                            <button type='submit' className='register-submit-btn'>
                                Register
                            </button>
                        </form>    

                        <div>
                            <p style={{marginBottom:'10px'}}>Already have an account?&nbsp;<span style={{color:'#007bff',textDecoration:'underline',cursor:'pointer'}} onClick={()=>{navigate('/login')}}>Login</span></p>
                            <p style={{color:'#007bff',textAlign:'center',textDecoration:'underline',cursor:'pointer'}} onClick={()=>{navigate('/')}}>Back to Home</p>
                        </div>                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
