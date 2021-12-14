import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import db from '../Firebase'
import './Addnote.css'

function Addnote() {
    const state = useSelector(state=>state.data)
    const [title,setTitle] = useState('')
    const [des,setDes] = useState('')
    
    const addtask = async(e) => {
        e.preventDefault()
        if(state.data === null){
            alert('Sign in first to add a task')
        }

        else{
            await addDoc(collection(db,'user',`${state.data.uid}`,"tasks"),{
                docTitle:title,
                description:des,
                timeStamp: serverTimestamp()
            }).then(()=>{
                console.log("Data added successfully")
                setTitle('')
                setDes('')
            }).catch(err=>{
                console.log(err.message)
            })
        }

    }

    return (
        <div>
            <div className='addtask-container'>
                <form onSubmit={addtask} style={{width:'100%'}}>
                    <div>
                        <input type='text' 
                            style={{width:'95%'}} 
                            placeholder='Enter Task Title' 
                            value={title}
                            onChange={e=>{setTitle(e.target.value)}}
                            required/>
                    </div>

                    <div>
                        <textarea rows={5} cols={12} 
                            className='addtask-textarea' 
                            placeholder='Enter Description' 
                            value={des}
                            onChange={e=>{setDes(e.target.value)}}
                            required/>
                    </div>
                
                    <button type='submit' className='addtask-btn'>Add task</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
