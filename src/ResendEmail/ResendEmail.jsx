import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

function ResendEmail({ usermail }) {
  const [email, setEmail] = useState(null)
  const [msg, showmsg] = useState('')

  const handleInputChange = async (e) => {
    const { id, value } = e.target
    if (id === 'email') {
      await setEmail(value)
    }
  }

  const resetPassword = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        email: email,
    }
    try{
			let resp=await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/resend_activation/`,requestOptions)
      if (resp.status != 200) {
        await showmsg('Email has been sent again')
      } else {
        await showmsg('')
      }
		}
		catch(err){
			console.error(err)
		}
    // fetch(
    //   'https://dropship-io.herokuapp.com/auth/users/resend_activation/',
    //   requestOptions
    // ).then(async (response) => {
    //   if (response.status != 200) {
    //     await showmsg('Email has been sent again')
    //   } else {
    //     await showmsg('')
    //   }
    // })
  }

  return (
    <>
      <div className='page-login d-flex align-items-center justify-content-center'>
        <div className='card'>
          <div className='card-body '>
            <form className='m-3'>
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
              </div>
              <div className='m-3 btn-div'>
                <NavLink
                  onClick={resetPassword}
                  to='/resend-email'
                  className='btn-login'
                >
                  Send Email
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResendEmail
