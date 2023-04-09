import React,{useEffect,useRef,useState} from 'react';
import { API_URL } from '../Config/Config';
import jwt_decode from "jwt-decode";
import './Checkout.css';
import axios from 'axios';

const Checkout = () => {
    const [id,setId]=useState('');
    const [subscribed,setIsSubscribed]=useState('')
    let check=true;

	const formRef = useRef(null);
    debugger
    useEffect(()=>{
      decodeToken()
      formRef.current.submit();
    })

      const decodeToken=()=>{
        var decoded = jwt_decode(localStorage.getItem("token"));
        setId(decoded.user_id)
        console.log("id",id)
      }
    
  
    return (
        <> 
         <div className="container">
         <form ref={formRef}
         action={`${API_URL}/payment/checkout/create-checkout-session/${id}/`} method="GET">
             <button  className="btn-checkout" type="submit" >Checkout</button>
         </form>
        </div>
        
        </>
    );
}

export default Checkout;
