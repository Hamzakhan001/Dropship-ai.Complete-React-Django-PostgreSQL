import React,{useState} from 'react'
import {NavLink} from 'react-router-dom';
import './Recover-pass.css'
import Toast  from '../Toast/Toast';
import axios from 'axios'

// https://dropship-io.herokuapp.com/auth/users/reset_password/
function Recover() {
	const [email,setEmail]=useState(null)

	const handleInputChange = async (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
    }

	const resetPassword=async ()=>{
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
				email:email,
		};
		let cont='Email has been sent to you'
		let col='green'
		try{
			let resp=await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,requestOptions)
			if(resp.status==204){
				<Toast content={cont} color={col} />
			}
		}
		catch(err){
			console.error(err)
		}
	}

  return (
	<>
	<div className="page-login d-flex align-items-center justify-content-center">
	<div className="card" >
		<div className="card-body ">
		<div className="row m-5">
		<span className=''>Recover</span> <br/>
		<span className='dropship-ai'> Password</span> 
		</div>
		<form className="m-3">
		<div className="mb-3">
			<label for="email" className="form-label">Email address</label>
			<input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email}
			onChange = {(e) => handleInputChange(e)} placeholder='Enter Your Email Address'/>
		</div>
		<div className="m-3 btn-div">
		<NavLink onClick={resetPassword} to="/recover" className="btn-login">
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

export default Recover