import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import BakerNavbar from './BakerComponents/BakerNavbar'
import CakeForm from './BakerComponents/CakeForm'
import ViewCake from './BakerComponents/ViewCake'
import ErrorPage from './Components/ErrorPage'
import HomePage from './Components/HomePage'
import Login from './Components/Login'
import PrivateRoute from './Components/PrivateRoute'
import Signup from './Components/Signup'
import CustomerNavbar from './CustomerComponents/CustomerNavbar'
import CustomerViewCake from './CustomerComponents/CustomerViewCake'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <Router>

    <div className="App">
        <Routes>
            <Route path="/" element={<Login/>}/>
            {/* <Route path="/add-cake" element={<AddCake/>}/> */}
            <Route path="/view-cake" element={<ViewCake/>}/>
            {/* <Route path="/edit-cake/:id" element={<EditCake/>}/> */}
            <Route element={ErrorPage}/>

        </Routes>
    </div>
    </Router>
  )
}

export default App