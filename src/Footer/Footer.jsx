import React from 'react'
import './Footer.css'

function Footer() {
  return (<>
	<section id="header" className="d-flex align-items-center mt-5 footer">
		 <div className="container-fluid nav_bg"> 
			<div className="row">
				<div className="col-10 mx-auto">
					<div className="row">
					<div className='col-md-3 ml-5 pt-5 pt-lg-0 order-1 order-lg-2 d-flex justify-content-center flex-column '>
					    <h5 >Login Now</h5>
						<span>Home</span>
						<span>Features</span>
						<span>Pricing</span>
						<span>Support</span>
						<span>Blog</span>
						<span>Reviews</span>
					</div>
					<div className='col-md-3 ml-5 pt-5 pt-lg-0 order-1 order-lg-2 d-flex justify-content-center flex-column '>
					    <h3>Menu</h3>
						<span>Home</span>
						<span>Features</span>
						<span>Pricing</span>
						<span>Support</span>
						<span>Blog</span>
						<span>Reviews</span>
					</div>
					<div className='col-md-3 ml-5 pt-5 pt-lg-0 order-2 order-lg-2 d-flex justify-content-center flex-column '>
					<h3>Get In Touch</h3>
						<span>Call Anytime: 8am – 4pm Monday - Friday</span>
						<span>Toll Free: 111 222 333 444 55</span>
						<span>Local: 1-289-271-9767</span>
						<span>Fax: 1-888-908-6056</span>
						<span>info@dropsiping.com</span>
					</div>
					<div className='col-md-3 ml-5 pt-5 pt-lg-0 order-2 order-lg-2 d-flex justify-content-center flex-column'>
					<h3>Follow us</h3>
						<span>Home</span>
						<span>Features</span>
					</div>
					</div>
				</div>
			</div>
			</div>
	</section>
	</>
  )
}

export default Footer