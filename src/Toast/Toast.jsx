import React from 'react';
import './Toast.css'

function Toast({content,color}) {

  return (
	<>
	<div aria-live="polite" aria-atomic="true" className={color =='red'?'toast-style-red':'toast-style-green'}
	 style={{background:`${color}`}}>
		 <div class="toast-body">
      	  {content}
   		 </div>
	</div>
	</>
  )
}

export default Toast