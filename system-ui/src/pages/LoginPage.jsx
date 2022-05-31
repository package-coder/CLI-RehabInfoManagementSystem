import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import BgLogo from '../images/undraw_doctors_hwty.svg';
import { isAuthenticated, login } from '../auth';
import { Navigate } from 'react-router-dom';

function LoginPage() {

  if(isAuthenticated()){
    return <Navigate to="/" />
  }

  return (
    <Box className="app-auth overflow-hidden" sx={{ flexGrow: 1 }}>
      <div className="row h-100">
        <div className="col auth-bg d-flex align-items-center justify-content-center">
          <img src={BgLogo} alt="Nurse and doctor" />
        </div>
        <div className="col-3">
          <div className='row h-100 align-items-center flex-column p-5' >
            <header class="col-auto">
              <Toolbar>
                <h4 className="auth-subheading">Rehab Information <br/> Management System</h4>
              </Toolbar>
            </header>
            <div class="col mt-5">
              <section className='h-100 flex-column m-auto'>
                <section>
                  <h1 className="auth-heading text-center">
                    Authentication
                  </h1>
                </section>
                <section class="mt-5 mx-2 auth-form">
                  <section class="d-flex flex-column gap-3 pt-3">
                    <div>
                      <label for="username" class="form-label">Username</label>
                      <input type="text" id="username" class="form-control"/>
                    </div>
                    <div>
                      <label for="password" class="form-label">Password</label>
                      <input type="password" id="password" class="form-control"/>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" value='' id="remember-me" class="form-check-input"/>
                      <label for="remember-me" class="form-check-label">Remember me</label>
                    </div>
                  </section>
                  <section class="mt-5 d-grid">
                    <button type="button" class="btn btn-primary auth-submit">Login</button>
                  </section>
                </section>
              </section>
              
            </div>
            <footer class="col-auto">
              <Toolbar>
                <a href="#" class="link-primary">Forget Password?</a>
              </Toolbar>
            </footer>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default LoginPage