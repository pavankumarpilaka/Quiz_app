import React from 'react'
import Quiz from './Components/Quiz/Quiz'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
     <ToastContainer /> 
      <Quiz/>
    </>
  )
}

export default App