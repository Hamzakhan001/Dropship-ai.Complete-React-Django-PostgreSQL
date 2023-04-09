import React from 'react';
import { Route, Redirect } from 'react-router-dom';
 

const AuthGuard = ({ component: Component, ...rest }) => {
 
   function hasJWT() {
	debugger
       let flag = false;
        debugger
       //check user has JWT token
       localStorage.getItem("token") ? flag=true : flag=false
       return flag
   }
 
   return (
       <Route {...rest}
           render={props => (
               hasJWT() ?
               <Route {...rest} render={props => <Component {...rest} {...props} />} />
                   :
                   <Redirect to='/login' />
           )}
       />
   );
};
 
export default AuthGuard;