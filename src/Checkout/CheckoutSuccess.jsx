import React,{useEffect} from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Checkout.css'


function CheckoutSuccess() {

  useEffect(()=>{
    checkToken()
  })

  const checkToken=async()=>{
    if(localStorage.getItem("token") !=undefined){
      try {   
        console.log("funcalled1")     
        const requestOptions = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
        let resp = await axios.get(
          `${process.env.REACT_APP_API_URL}/payment/subscription/verify/`,
          requestOptions
        )
        
        if (resp.status == 200) {
          localStorage.setItem('isSubscribed', resp.data.isSubscribed)
        }
      } catch (err) {
        if(err.response.status==401){
          localStorage.removeItem("token");
          localStorage.removeItem("isSubscribed")
          localStorage.removeItem("refresh")
        }
      }
    }
  }


  return (
	<div className="page-login d-flex align-items-center justify-content-center">
    <div className="card" >
      <div className="card-body ">
      <div className="row m-5">
      <span>Congratulations you have successfully subscribed!</span>
      <span className='center-div'> Click{' '}<NavLink to='/generate-product'> here</NavLink> to generate product </span>
      </div>
      <form className="m-3">
      <div className="m-3 btn-div">
      </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess