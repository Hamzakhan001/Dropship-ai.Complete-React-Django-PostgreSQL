import React,{useState,useEffect} from 'react'
import './Navbar.css'
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom'
import logo  from '../assets/logo.png'

function Navbar() {
  const [sub,setisSub]=useState(false)

	useEffect(()=>{
		if(localStorage.getItem("isSubscribed") !=null){
			setisSub(localStorage.getItem("isSubscribed"));
		}
		else if(localStorage.getItem("isSubscribed") ==null){
			setisSub(false)
		}
	})


  return (
  <>
  <div className="container-fluid nav_bg navbar-reset"> 
  <div className="row">
    <div className="col-10 mx-auto">
	<nav className="navbar navbar-expand-lg navbar-light bg-light navbar-resize">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">
    <img
      src={logo}
      alt='socials'
      className='img-fluid animated logo-cls'
      />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse navbar-custom blur-three" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="menu_active" 
          exact to="/">Home</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink  className="nav-link" to="/about"  activeClassName="menu_active">About Us</NavLink>
        </li> */}
        <li className="nav-item">
        <NavLink  className="nav-link" to="/shop" activeClassName="menu_active">Dropship Pro</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink  className="nav-link" to="/faq" activeClassName="menu_active">FAQ</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/blog" activeClassName="menu_active">Blog</NavLink>
        </li>
        <li className="nav-item">
          <NavLink  className="nav-link" to="/account" activeClassName="menu_active">My Account</NavLink>
        </li> */}
      </ul>
    </div>
  </div>
</nav>
</div>
  </div>
  </div>
</>
  )
}

export default Navbar