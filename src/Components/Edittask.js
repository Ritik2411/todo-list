import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import db from '../Firebase'
import './Edittask.css'

function Edittask() {

    const navigate = useNavigate()
    const [title,setTitle] = useState('')
    const [des,setDes] = useState('')
    const {id} = useParams()
    const state = useSelector(state=>state.data)

    const editTask = async(e) => {
        e.preventDefault()
        if(state.data===null){
            console.log("No user found")
        }
        else{
            const docData = doc(db,'user',`${state.data.uid}`,'tasks',id)
            await updateDoc(docData,{
                docTitle:title,
                description:des,
                timeStamp: serverTimestamp()
            }).then(()=>{
                console.log("data updated successfully")
                navigate('/')
            }).catch((err)=>{
                console.log(err.message)
            })
        }
        
    }

    return (
        <div style={{padding:'20px'}}>
            <div className='edittask-container'>
                <form onSubmit={editTask} style={{width:'100%'}}>
                    <div>
                        <input type='text' 
                            className='edittask-title' 
                            placeholder='Enter Task Title' 
                            value={title}
                            onChange={e=>{setTitle(e.target.value)}}
                            required/>
                    </div>

                    <div>
                        <textarea rows={5} cols={12} 
                            className='edittask-textarea' 
                            placeholder='Enter Description' 
                            value={des}
                            onChange={e=>{setDes(e.target.value)}}
                            required/>
                    </div>
                
                    <button type='submit' className='edittask-btn'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default Edittask
