import React from 'react'
import './Tasklist.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import db from '../Firebase';
import { useSelector } from 'react-redux';

function Tasklist({data}) {

    const navigate = useNavigate()
    const state = useSelector(state=>state.data)
    
    const deleteTask = async(id) => {
        const docItem = doc(db,'user',`${state.data.uid}`,'tasks',id)
        await deleteDoc(docItem).then(()=>{
            console.log('Item deleted successfully')
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    return (
        <div style={{padding:'8px 10px',backgroundColor:'white',marginTop:'30px',display:'flex',borderRadius:'5px',boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
            
            <div className='tasklist-title'>
                <h2>{data.data.docTitle}</h2>
                <p style={{marginTop:'5px'}}>{data.data.description}</p>
            </div>
            
            <div>
                <div>
                    <IconButton onClick={()=>{navigate(`/editTask/${data.id}`)}}>    
                        <EditIcon/>
                    </IconButton>                
                </div>
                
                <div>
                    <IconButton>
                        <DeleteIcon onClick={()=>{deleteTask(data.id)}}/>
                    </IconButton>                
                </div>    
                
            </div>
            
        </div>
    )
}

export default Tasklist
