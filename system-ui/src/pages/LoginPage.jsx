import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import BgLogo from '../images/undraw_doctors_hwty.svg';
import { isAuthenticated, login } from '../auth';
import { Navigate, useNavigate } from 'react-router-dom';

function LoginPage() {

  const navigate = useNavigate();
  const formRef = React.useRef()
  const usernameRef = React.useRef()
  const passwordRef = React.useRef()
  const invalidRef = React.useRef()


  if(isAuthenticated()){
    return <Navigate to="/" />
  }

  function handleSubmit(e){
    formRef.current.classList.add('was-validated')

    if(!formRef.current.checkValidity()) return;

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    
    login(username, password)
    .then(() => {
      navigate('/', {replace:true});
    })
    .catch(e => {
      usernameRef.current.value = ''
      passwordRef.current.value = ''
      usernameRef.current.classList.add('is-invalid')
      passwordRef.current.classList.add('is-invalid')
    })
  }

  return (
    <Box className="app-auth overflow-hidden" >
      <div className="d-flex h-100">
        <div className="flex-shrink-1 flex-grow-1 auth-bg d-flex align-items-center justify-content-center">
          <img src={BgLogo} alt="Nurse and doctor" />
        </div>
        <div className="flex-shrink-1 bg-white">
          <div className='d-flex h-100 align-items-center flex-column p-5' >
            <header class="flex-shrink-1">
              <Toolbar>
                <h4 className="auth-subheading">Rehab Information <br/> Management System</h4>
              </Toolbar>
            </header>
            <div class="mt-5 flex-shrink-1 flex-grow-1">
              <section className='h-100 flex-column m-auto'>
                <section>
                  <h1 className="auth-heading text-center">
                    Authentication
                  </h1>
                </section>
                <section class="mt-5 mx-2 auth-form">
                  <form class="form d-flex flex-column gap-3 pt-3" ref={formRef} noValidate>
                    <div>
                      <label for="username" class="form-label">Username</label>
                      <input type="text" id="username" ref={usernameRef} class="form-control" required/>
                    </div>
                    <div>
                      <label for="password" class="form-label">Password</label>
                      <input type="password" id="password" ref={passwordRef} class="form-control" required/>
                      <div class="invalid-feedback text-center" ref={invalidRef}>
                        Invalid Credetials
                      </div>
                    </div>

                  </form>
                  <section class="mt-5  d-grid">
                    <button type="button" class="btn btn-primary auth-submit" onClick={handleSubmit}>Login</button>
                  </section>
                </section>
              </section>
              
            </div>
            <footer class="flex-shrink-1">
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