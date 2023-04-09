import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
// import Toast from '../Toast/Toast'
import signupicon from '../assets/signup.png'
import ResendEmail from '../ResendEmail/ResendEmail';
import { Store } from 'react-notifications-component';
import './Signup.css'
import axios from 'axios'

function Signup() {
  const [userName, setUserName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [validatepass, setValidatePass] = useState(false)
  const [validateUser, setValidateUserName] = useState(false)
  const [validateEmail, setValidateemail] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [signuperr, setsignupError] = useState(null)
  const [emailexists, setEmailExists] = useState(null)
  const [color, setColor] = useState('')
  const [content, setContent] = useState('')

  const handleInputChange = async (e) => {
    const { id, value } = e.target
    if (id === 'userName') {
      setUserName(value)
    }
    if (id === 'email') {
      setEmail(value)
    }
    if (id === 'password') {
      setPassword(value)
    }
    if (id === 'confirmPassword') {
      await setConfirmPassword(value)
      if (password != value) {
        setValidatePass(true)
        displayToast('hello', 'green')
      } else if (password == value) {
        setValidatePass(false)
      }
    }
  }

  const displayToast = (content, color) => {
    setColor(color)
    setContent(content)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 2000)
  }

  const resendEmailComponent = async () => {
    <ResendEmail />
  }

  const createUser = async () => {
    if (userName == '' && userName == null) {
      setValidateUserName(true)
      return
    } else if (userName != '' && userName != null) {
      setValidateUserName(false)
    }
    if (email == '' || email == null) {
      setValidateemail(true)
      return
    } else if (email != '' && email != null) {
      setValidateemail(false)
    }
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
        username: userName,
        email,
        password,
        confirmPassword,
    }

    try{

			let resp=await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`,requestOptions)
      if(!resp){
      }
      if (resp.status == 201) {
        Store.addNotification({
          title: "Congratulations!",
          message: "Confirmation email has been sent to your email",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      } else if (resp.status == 400) {
        setEmailExists(true)
        // setsignupError()
      } else if (resp.status == 401) {
        // setEmailExists(true)
      }
		}
		catch(err){
      if(err.response.status==400){
        setEmailExists(true)
      }
			console.error(err)
		}

    // fetch(`${process.env.REACT_APP_API_URL}/auth/users/`, requestOptions)
    //   .then((resp) => {
    //     if (resp.status == 200) {
    //       debugger
    //     } else if (resp.status == 401) {
    //       setsignupError()
    //     } else if (resp.status == 400) {
    //       setEmailExists(true)
    //     }
    //   })
    //   .catch((err) => {
    //     debugger
    //   })
  }

  return (
    <div>
      <section id='header' className='d-flex align-items-center mt-5'>
        <div className='container-fluid nav_bg'>
          <div className='row'>
            {/* {showToast ? <Toast color={color} content={content} /> : ''} */}

            <div className='col-10 mx-auto'>
              <div className='row'>
                <div className='col-md-7 ml-5 pt-5 pt-lg-0 order-2 order-lg-2 d-flex justify-content-center flex-column signup-form'>
                  <h1>
                    <span className=''> SIGN UP! to gain access to</span> <br />
                    <span className='dropship-ai'> DropShip.Ai</span>
                  </h1>
                  <form className='mt-5'>
                    <div className='mb-3'>
                      <label for='userName' className='form-label'>
                        User Name
                      </label>
                      <input
                        type='email'
                        className='form-control'
                        id='userName'
                        aria-describedby='emailHelp'
                        value={userName}
                        onChange={(e) => handleInputChange(e)}
                        placeholder='Enter User Name'
                      />
                      {validateUser && (
                        <div className='text-danger'>UserName is required</div>
                      )}
                    </div>
                    <div className='mb-3'>
                      <label for='email' className='form-label'>
                        Email address
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
                        value={password}
                        onChange={(e) => handleInputChange(e)}
                        placeholder='Enter Password'
                      />
                    </div>
                    <div className='mb-3'>
                      <label for='confirmPassword' className='form-label'>
                        Confirm Password
                      </label>
                      <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => handleInputChange(e)}
                        className='form-control'
                        id='confirmPassword'
                        placeholder='Confirm Password'
                      />
                      {validatepass && (
                        <div className='text-danger'>Passwords don't match</div>
                      )}
                    </div>
                  </form>
                  {emailexists && (
                    <div className='text-danger'>
                      Email or Username already exists
                    </div>
                  )}
                  <div className='mt-3'>
                    <NavLink
                      onClick={createUser}
                      to='/signup'
                      className='btn-signup'
                    >
                      Sign Up
                    </NavLink>
                  </div>
                  <div className='mt-3'>
                    if you already have an account click{' '}
                    <NavLink to='/login'> here</NavLink> to login
                  </div>
                  <div className=''>
                    Didn't get verification mail?
                    <NavLink onClick={resendEmailComponent} to='/resend-email'>
                      click here!
                    </NavLink>
                  </div>
                </div>
                <div className='col-lg-5 order-1 order-lg-1 header-img d-flex justify-content-center flex-column'>
                  <img
                    src={signupicon}
                    alt='socials'
                    className='img-fluid animated'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup
