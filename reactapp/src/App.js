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
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <Router>

    <div className="App">
        <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/baker-navbar" element={<BakerNavbar />} />
                <Route path="/customer-navbar" element={<CustomerNavbar />} />
                <Route path="/baker-navbar" element={<BakerNavbar username="BakerUser" role="Baker" />}/>
                <Route path="/home" element={<HomePage />} />
                <Route path="/add-cake" element={<CakeForm isEditing={false} />} />
                <Route path="/edit-cake" element={<CakeForm isEditing={true} />} />
                <Route path="/view-cake" element={<ViewCake />} />
        </Routes>
    </div>
    </Router>
  )
}

export default App