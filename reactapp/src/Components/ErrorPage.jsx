import React from 'react'
import {useHistory} from 'react-router-dom'

const ErrorPage = () => {
    const history=useHistory();

    const handleGoBack=()=>{
        history.push('/');
    };
  return (
    <div className="error-page">
        <h1>Oops! Something Went Wrong</h1>
        <p>Please try again later.</p>
        <img src="/alert.png" alt="Error"/>
        <button onClick={handleGoBack}>Go to Home</button>

    </div>
  )
}

export default ErrorPage