import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import { Store } from 'react-notifications-component'

function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [validatepass, setValidatePass] = useState(false)
  const [validateEmail, setValidateemail] = useState(false)
  const [unauthPassword, setunauthPassword] = useState(null)
  const [loginerr, setloginerr] = useState(null)
  const [showloginerr, setshowloginerr] = useState(false)

  const handleInputChange = async (e) => {
    const { id, value } = e.target
    if (id === 'email') {
      setEmail(value)
    }
    if (id === 'password') {
      setPassword(value)
    }
  }
  const hasSubscription = async () => {
    try {
      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      console.log("funcalled3")
      let resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/payment/subscription/verify/`,
        requestOptions
      )
      if (resp.status == 200) {
        localStorage.setItem('isSubscribed', resp.data.isSubscribed)
        setTimeout(() => {
        window.location.href = '/'
        }, 100);
        }
    } catch (err) {
      if(err.response.status==401){
        localStorage.removeItem("token");
        rfreshToken();
      }
    }
  }

  const rfreshToken = async () => {
    try {
      if (localStorage.getItem('refresh') != undefined) {
        const requestOptions = {
          headers: { 'Content-Type': 'application/json' },
          refresh: localStorage.getItem('refresh'),
        }
        let resp = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`,
          requestOptions
        )
        if (resp.status == 200) {
          localStorage.removeItem('token')
          localStorage.setItem('token', resp.data.access);
          hasSubscription()
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const Login = async () => {
    if (email == '' || email == null) {
      setValidateemail(true)
      return
    } else if (email != '' && email != null) {
      setValidateemail(false)
    }
    if (password == '' || password == null) {
      setValidatePass(true)
      return
    } else if (password != '' && password != null) {
      setValidatePass(false)
    }
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
      username: email,
      password,
    }

    try {
      let resp = await axios.post(
        'https://dropship-io.herokuapp.com/auth/jwt/create',
        requestOptions
      )
      if (resp.status == 200) {
        Store.addNotification({
          title: "You've logged in !",
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        })

        setloginerr('')
        setshowloginerr(false)
        const token = resp.data.access
        await localStorage.setItem('token', token)
        await localStorage.setItem('refresh', resp.data.refresh)
        hasSubscription()
        
      }
    } catch (err) {
      setshowloginerr(true)
      if(err.response.status==401){
        await setloginerr("No active account found with the given credentials")
      }
      if(err.response.status==400){
        await setloginerr("Login failed")
      }
      
    }
  }

  return (
    <>
      <div className='page-login d-flex align-items-center justify-content-center '>
        <div className='card login-card-div'>
          <div className='card-body login-body'>
            <div className='row m-5'>
              <span className=''>Login</span> <br />
              <span className='dropship-ai'> DropShip.Ai</span>
            </div>
            <form className='m-3'>
              <div className='col-md-2'>
                <label for='email' className='form-label'>
                  Username
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  aria-describedby='emailHelp'
                  value={email}
                  onChange={(e) => handleInputChange(e)}
                  placeholder='Enter Your Email Address'
                />
                {validateEmail && (
                  <div className='text-danger'>Email is required</div>
                )}
              </div>
              <div className='mb-3'>
                <label for='password' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => handleInputChange(e)}
                />
                {validatepass && (
                  <div className='text-danger'>Password required</div>
                )}
              </div>
              {showloginerr && <div className='text-danger'>{loginerr}</div>}
              {unauthPassword != null && (
                <div className='text-danger'>{unauthPassword}</div>
              )}
              <div className='m-3 btn-div'>
                <NavLink onClick={Login} to='/login' className='btn-login'>
                  Login
                </NavLink>
                <p>
                  Don't have account?{' '}
                  <NavLink to='/signup'> Signup</NavLink>
                </p>
                <p>
                  If you forgot you password click{' '}
                  <NavLink to='/recover'> here</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
