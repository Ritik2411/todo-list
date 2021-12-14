import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import db, { auth } from '../Firebase'
import './Header.css'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { doc, getDoc } from 'firebase/firestore'

function Header() {

    const state = useSelector(state=>state.data)
    const navigate = useNavigate()
    const [load,setLoad] = useState(true)
    const [userdata,setUserdata] = useState([])

    useEffect(async()=>{
        if(state.data !== null){
            await getDoc(doc(db,'user',`${state.data.uid}`)).then((res)=>{
                setUserdata(res.data())
                console.log("data fetched")
            }).catch(err=>{
                console.log(err.message)
            })
        }
    },[state.data])

    const sigin = () => {
        navigate('/login')
    }

    const signout = () => {
        signOut(auth).then(()=>{
            navigate('/')
            console.log("Signed out sucessfully")
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    setTimeout(()=>{
        setLoad(false)
    },3000)

    return (
        <div style={{position:'sticky'}}>
            <div className='header-container'>
                <div className='header-title' onClick={()=>{navigate('/')}}>
                    <img src='https://cdn2.iconfinder.com/data/icons/business-office-icons/256/To-do_List-512.png' className='header-logo'/>
                    &nbsp;<p>Todo List</p>
                </div>

                <div style={{flexGrow:'1'}}/>
                
                {
                    (state.data!==null)?(
                        (load)?(
                            <div>
                                <ClipLoader color='#dc4535' loading={load} size={20}/>
                            </div>
                            
                        ):(
                        <div className='logged'>
                            <div className='user-details'>
                                <p style={{color:'gray',fontWeight:'bold'}}>Hello,</p>
                                <p style={{color:'gray',marginRight:'10px',fontWeight:'bold'}}>{userdata.username}</p>
                            </div>
                            
                            <button className='logout-btn' onClick={signout}>Logout</button>
                        </div>
                        )
                        
                    ):(
                        <button className='login-btn' onClick={sigin}>Login</button>
                    )
                }
            </div>
        </div>

    )
}

export default Header
