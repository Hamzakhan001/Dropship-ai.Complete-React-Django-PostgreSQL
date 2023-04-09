import React,{useState} from 'react'
import {NavLink} from 'react-router-dom';
import axios from 'axios'
import Toast from '../Toast/Toast';
import { useLocation } from "react-router-dom";
import { Store } from 'react-notifications-component';
import queryString from 'query-string'
import {useParams} from 'react-router-dom';

function ResetPassword() {
	const [email,setEmail]=useState(null)
	const {search}=useLocation()
  	const {uuid,token}=queryString.parse(search)
	const [err,seterr]=useState('')

	const handleInputChange = async (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
    }

	const resetPassword=async ()=>{
		const requestOptions = {
			headers: { 'Content-Type': 'application/json' },
			new_password:email,
				uid:uuid,
				token:token
		};
		let cont='Email has been sent to you'
		let col='green'
		try{
			let resp=await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,requestOptions)
			if(resp.status==204){
				seterr('')
				Store.addNotification({
					title: "Congratulations!",
					message: "Password has been updated!",
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
				// <Toast content={cont} color={col} />
			}
		}
		catch(err){
			console.error(err)
			seterr("Password shouldn't be entirely numeric or too simple")
		}
	}

  return (
	<>
	<div className="page-login d-flex align-items-center justify-content-center">
	<div className="card" >
		<div className="card-body ">
		<div className="row m-5">
		<span className=''>Reset</span> <br/>
		<span className='dropship-ai'> Password</span> 
		</div>
		<form className="m-3">
		<div className="mb-3">
			<label for="email" className="form-label">New Password</label>
			<input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email}
			onChange = {(e) => handleInputChange(e)} placeholder='Enter Your New Password'/>
		</div>
		{err!='' && <div className="text-danger">{err}</div>}
		<div className="m-3 btn-div">
		<NavLink onClick={resetPassword} to="/recover" className="btn-login">
			Reset Password
		</NavLink>
		</div>
		</form>
		</div>
		</div>
	</div>
	</>
	)
}

export default ResetPassword