import { onSnapshot,collection, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import Addnote from '../Components/Addnote'
import Tasklist from '../Components/Tasklist'
import db from '../Firebase'
import './Home.css'

function Home() {
    const state = useSelector(state=>state.data)
    const [tasklist,setTask] = useState([])
    const [load,setLoad] = useState(true)
    const [copytask,setCopytask] = useState([]) 

    useEffect(async()=>{
        if(state.data === null){
            setTask([])
        }

        else{
            const taskRef = collection(db,"user",`${state.data.uid}`,'tasks')
            const q = query(taskRef,orderBy('timeStamp','desc'))
            await onSnapshot(q,((snapshot)=>{
                setTask(snapshot.docs.map((data)=>({
                    id:data.id,
                    data:data.data()
                })))
            }))
        }
    },[state.data])
    

    useEffect(()=>{
        const copyData = tasklist
        setCopytask(copyData)
    },[tasklist])

    const filterData = (e) => {
        const value = e.target.value
        if(value === ''){
            setCopytask(tasklist)
        }

        else{
            const FD = copytask.filter(data=>{
                return(data.data.docTitle.toLowerCase().includes(value.toLowerCase()))
            })

            if(FD){
                setCopytask(FD)     
            }
        }
    }

    setTimeout(()=>{
        setLoad(false)
    },3000)

    return (
        <div className='home-container'>
            <div className='addnote-home'>
                <Addnote/>
            </div>
            
            <div className='home-tasklist'>
                {
                    (load)?(
                        <div className='loader-style'>
                            <ClipLoader color='#007bff' loading={load} size={50}/>
                        </div>
                        
                    ):(
                        (state.data !== null)?(
                            (copytask!==undefined && tasklist.length>0)?(
                                (copytask.length>0)?(
                                    <>
                                        <div style={{padding:'5px'}}>
                                            <h2 style={{margin:'10px',textAlign:'center'}}>Task todo</h2>
                                            <input type='text' 
                                                className='search-task' 
                                                onChange={(e)=>{filterData(e)}}
                                                placeholder='Search by task title'/>
                                        </div>    
                                        {
                                            copytask.map((data)=>(
                                                <div className='editnote-home'>
                                                    <Tasklist data={data}/>
                                                </div>
                                            ))               
                                        }    
                                    </>    
                                ):(
                                    <>
                                        <div style={{padding:'5px'}}>
                                            <h2 style={{margin:'10px',textAlign:'center'}}>Task todo</h2>
                                            <input type='text' 
                                                className='search-task' 
                                                onChange={(e)=>{filterData(e)}}
                                                placeholder='Search by task title'/>
                                        </div>
                                        <h2 style={{textAlign:'center',marginTop:'20px'}}>No data found!!!</h2>
                                    </>
                                    
                                )
                        ):(
                            <h2 style={{textAlign:'center',marginTop:'20px'}}>Add your first task :)</h2>
                        )
                        ):(
                            <h2 className='for-no-user'>Sign or create an account to add a task</h2>
                        )
                    )
                }
            </div>
                
        </div>
    )
}

export default Home
