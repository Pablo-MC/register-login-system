import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import authContext from '../../context/auth/authContext';


const Login = (props) => {

   const { authenticated, registered, message, signIn } = useContext(authContext);
   
   useEffect(() => {
      if (authenticated) props.history.push('/');
      // eslint-disable-next-line
   }, [authenticated, message, props.history]);


   const [ user, setUser ] = useState({
      email: '',
      password: ''
   });

   const { email, password } = user;

   
   const handleChange = (e) => {
      setUser({...user, [e.target.name] : e.target.value});
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      // Validar aqui los campos del formulario en caso de ser necesario

      // Iniciar Sesion al Usuario
      signIn({
         email: email,
         password: password
      });

      // Limpiar/Reiniciar el formulario
      setUser({email: '', password: ''});
   }


   return (
      <div className="container">
         <div className="row justify-content-center align-items-center h-100 mt-4">
            <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
               <div className="border rounded shadow-sm p-4 my-3">

                  {message !== null ? (<div className="alert alert-danger" role="alert">{message}</div>) : null}

                  <form
                     onSubmit={handleSubmit}
                  >
                     <div className="form-group">
                        <label>Email address</label>
                        <input 
                           className="form-control" 
                           type="email"
                           name="email"
                           value={email}
                           onChange={handleChange}
                           required   
                        />  
                     </div>
                     <div className="form-group">
                        <label>Password</label>
                        <input
                           className="form-control"
                           type="password" 
                           name="password"
                           value={password}
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <button className="btn btn-block btn-primary mt-4" type="submit">Log In</button>
                  </form>
               </div>                 
               {!registered
               ?
                  <>
                     <h6 className="text-center font-weight-light mt-4">- New to the website? -</h6>
                     <Link className="btn btn-block btn-secondary mt-4" to="/register">Create account</Link>
                  </>   
               :   
                  null
               }
            </div>
         </div>
      </div>
   );
}

export default Login;