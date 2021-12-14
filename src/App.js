import './App.css';
import Header from './Components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Resetpassword from './Pages/Resetpassword';
import Edittask from './Components/Edittask';
import { useEffect } from 'react';
import { auth } from './Firebase';
import {useDispatch,useSelector} from 'react-redux'
import { user } from './Redux/Action';
import Error from './Pages/Error';

function App() {

  const dispatch = useDispatch()
  const state = useSelector(state=>state.data)
  useEffect(()=>{
    auth.onAuthStateChanged(userData=>{
      if(userData){
        dispatch(user({
          data:userData
        }))
      }
      else{
        dispatch(user({
          data:null
        }))
      }
    })
  },[state.data])

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header/>
            <Home/>
          </>
        }/>

        <Route path="/edittask/:id" element={
          <>
            <Header/>
            <Edittask/>
          </>
        }/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/resetpassword' element={<Resetpassword/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
