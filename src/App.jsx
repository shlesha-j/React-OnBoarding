import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import SignUp from './pages/SignUp'
import UserDetails from './pages/UserDetails'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UploadDocs from './pages/UploadDocs'
import PreviewPage from './pages/PreviewPage'

function App() {
  const [projects, setProjects] = useState([])
  // const API_Key = "https://api.freeprojectapi.com/api/CollegeProject/GetAllUsers"

  // const fetchData = async() => {
  //   try{
  //     const response = await axios.get(API_Key);
  //     console.log(response.data)
  //     setProjects(response.data.data)
  //   }catch(err){
  //     console.log("Error", err);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/upload-docs" element={<UploadDocs />} />
        <Route path='/preview-form' element={<PreviewPage/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
