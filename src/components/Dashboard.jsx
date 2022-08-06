import React from 'react'
import { useNavigate } from "react-router-dom";
import DashboardImage from '../styles/imgs/dashboard.svg'
import Header from './Header'

const Dashboard = () => {

  return (
    <>
      <Header />
      <div className='container-fluid component__dashboard'>
        <h2>Welcome to Demo App</h2>
        <img src={DashboardImage} />
      </div>
    </>
    
  )
}

export default Dashboard