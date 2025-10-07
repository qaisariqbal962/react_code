import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Auth from './pages/Auth'

 const App =()=> {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>

      </Routes>
    </div>
  )
}

export default App
