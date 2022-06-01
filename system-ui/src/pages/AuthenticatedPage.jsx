import React from 'react'
import { isAuthenticated } from '../auth';
import { Navigate } from 'react-router-dom';

function AuthenticatedPage({ children }) {

    if(!isAuthenticated()){
        return <Navigate to="/login" />
    }

  return <>
    {children}
  </>
}

export default AuthenticatedPage