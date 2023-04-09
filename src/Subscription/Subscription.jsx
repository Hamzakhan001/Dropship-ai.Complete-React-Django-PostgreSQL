import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'

function Subscription() {
	const [card, setCard] = useState(null)
	const [cvv, setCvv] = useState(null)
	const [expiration, setExpiration] = useState(null)
	const [msg, showmsg] = useState('')


	const handleInputChange = async (e) => {
		const { id, value } = e.target
		if (id === 'card') {
		  await setCard(value)
		}
		if (id === 'cvv') {
			await setCvv(value)
		  }
		if (id === 'expiration') {
		await setExpiration(value)
		}

	  }
	
	  const resetPassword = () => {
		// const requestOptions = {
		//   method: 'POST',
		//   headers: { 'Content-Type': 'application/json' },
		//   body: JSON.stringify({
		// 	email: email,
		//   }),
		// }
		// fetch(
		//   'https://dropship-io.herokuapp.com/auth/users/resend_activation/',
		//   requestOptions
		// ).then(async (response) => {
		//   if (response.status != 200) {
		// 	await showmsg('Email has been sent again')
		//   } else {
		// 	await showmsg('')
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
               <span className=''>Premium</span> <br />
              <span className='dropship-ai'> 7$/Monthly</span>
			  	<p className='mt-3'>Card Number</p>
                <input
                  type='card'
                  className='form-control mt-0'
                  id='card'
                  aria-describedby='emailHelp'
                  value={card}
                  onChange={(e) => handleInputChange(e)}
                  placeholder='123-456-7891-01'
                />
				<p className='mt-3'>CVV/Security</p>
				<input
                  type='email'
                  className='form-control '
                  id='cvv'
                  aria-describedby='emailHelp'
                  value={cvv}
                  onChange={(e) => handleInputChange(e)}
                  placeholder='252'
                />
				<p className='mt-3'>Expiration Date</p>
				<input
                  type='email'
                  className='form-control '
                  id='expiration'
                  aria-describedby='emailHelp'
                  value={expiration}
                  onChange={(e) => handleInputChange(e)}
                  placeholder='12/23'
                />
              </div>
              <div className='m-3 btn-div'>
                <NavLink
                  onClick={resetPassword}
                  to='/resend-email'
                  className='btn-login'
                >
                  Purchase
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
	  </>
  )
}

export default Subscription