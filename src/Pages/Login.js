import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import db, {auth, provider} from '../Firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Login() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password).then(()=>{
            console.log("Signed in successfully")
            navigate('/')
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    const signinwithgoogle = () => {
        signInWithPopup(auth,provider).then(async(res)=>{
            await setDoc(doc(db,'user',`${res.user.uid}`),{
                username:res.user.displayName,
                email:res.user.email
            }).then(()=>{
                console.log('data added successfully')
                navigate('/')
            }).catch(err=>{
                console.log(err.message)
            })        
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    return (
        <div className='main-login-container'>
            <div className='login-container'>
                <div className='login-fields'>
                    <div style={{display:'flex'}}>
                        <img src='https://cdn2.iconfinder.com/data/icons/business-office-icons/256/To-do_List-512.png' alt='no source' className='header-logo'/>
                        &nbsp;<h2 style={{marginBottom:'20px',color:'#007bff'}}>Login</h2>
                    </div>
                    
                    <form onSubmit={login} style={{width:'100%',marginBottom:'10px'}}>
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

                        <button type='submit' className='login-submit-btn'>
                            Login
                        </button>
                    </form>    

                    <div>
                        <p style={{color:'#007bff',textAlign:'center',textDecoration:'underline',cursor:'pointer',marginBottom:'10px',marginTop:'10px'}} onClick={()=>{navigate('/resetpassword')}}>Forget Password</p>
                        <p style={{marginBottom:'10px'}}>Don't have an account?&nbsp;<span style={{color:'#007bff',textDecoration:'underline',cursor:'pointer'}} onClick={()=>{navigate('/register')}}>Register</span></p>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'10px'}}>
                            <p>Signin With</p>&nbsp;
                            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt='no source' width={'25px'} height={'25px'} 
                                style={{backgroundColor:'#f2f2f2',padding:'5px',borderRadius:'5px',cursor:'pointer'}}
                                onClick={signinwithgoogle}
                            />
                        </div>                    
                        <p style={{color:'#007bff',textAlign:'center',textDecoration:'underline',cursor:'pointer'}} onClick={()=>{navigate('/')}}>Back to Home</p>
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default Login
