import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { useEffect,useState } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import axios from 'axios'
import { history } from './helper/history';
import RouteGuard from './RouteGuard/RouteGuard';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js/pure"
import Home from './Home/Home';
import Recover from './Recover-pass/Recover-password';
import About from './About/About';
import Navbar from './Navbar/Navbar';
import Signup from './Sign-up/Signup';
import Login from './Login/Login';
import GenerateResults from './GenerateResults/GenerateResults';
import EmailConfirmation from './Email-Confirmation/EmailConfirmation';
import ResendEmail from './ResendEmail/ResendEmail';
import AuthGuard from './RouteGuard/AuthGuard';
import Checkout from './Checkout/Checkout';
import ResetPassword from './Recover-pass/Reset-Password';
import CheckoutSuccess from './Checkout/CheckoutSuccess';
import CheckoutCancel from './Checkout/CheckoutCancel';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { REACT_APP_STRIPE_KEY } from './Config/Config'
import Subscribed from './Checkout/Subscribed';

const stripe_key = REACT_APP_STRIPE_KEY
const stripePromise = loadStripe(stripe_key)

function App() {
  const [sub,setIssub]=useState()
  const [isLoggedIn,setIsLoggedIn]=useState()

  useEffect( ()=>{
    checkToken();
  })
  const checkToken=async()=>{
    if(localStorage.getItem("token") !=undefined){
      try {   
        console.log("funcalledapp")     
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
          setIsLoggedIn(true)
          localStorage.setItem('isSubscribed', resp.data.isSubscribed)
          setIssub(resp.data.isSubscribed)
          localStorage.setItem('isSubscribed', resp.data.isSubscribed)
        }
      } catch (err) {
        if(err.response.status==401){
          localStorage.removeItem("token");
          localStorage.removeItem("isSubscribed")
        }
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
          localStorage.setItem('token', resp.data.access)
          
          checkToken();
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  


  return (
      <>
      <Navbar/>
      <Elements stripe={stripePromise} >
      <ReactNotifications />
      <Switch>
        <Route exact path='/'><Home/></Route> 
        <Route  path='/about'><About/></Route>
        <Route  path='/login'><Login/></Route> 
        <Route  path='/signup'><Signup/></Route> 
        <Route  path='/recover'><Recover/></Route> 
        <Route  path="/resend-email"><ResendEmail/></Route> 
        <Route  path="/email-confirmation"><EmailConfirmation/></Route> 
        <RouteGuard  path="/shop" component={sub==true ? Subscribed: Checkout}/>
        {/* <Route  path='/generate-product'><GenerateResults/></Route> */}
        <Route exact path='/generate-product'><GenerateResults/></Route>
        <Route  path='/checkout/success/'><CheckoutSuccess/></Route>
        <Route  path='/checkout/failed/'><CheckoutCancel/></Route> 
        <Route  path='/password-reset'><ResetPassword/></Route> 
        {/* <RouteGuard path="/generate-product" component={GenerateResults}/> */}
      </Switch>
      </Elements>
      </>
  );
}

export default App;
