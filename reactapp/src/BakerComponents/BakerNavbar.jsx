import React from 'react'
import {Link} from 'react-router-dom'


const BakerNavbar = () => {
  return (
    <div>
    <nav>
      <ul>
        <li><Link to="/baker/home">Home</Link></li>
        <li><Link to="/baker/add-cake">Add Cake</Link></li>
        <li><Link to="/baker/view-cakes">View Cakes</Link></li>
        <li><Link to="/logout">Logout</Link></li>

      </ul>

    </nav>
    </div>
    
  )
}

export default BakerNavbar