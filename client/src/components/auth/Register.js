import React, { useState, useContext, useEffect } from 'react';

import authContext from '../../context/auth/authContext';


const Register = (props) => {
   
   const { registered, message, registerUser } = useContext(authContext);

   useEffect(() => {

      if (registered) props.history.push('/login');

      // eslint-disable-next-line
   }, [registered, message, props.history]);


   const [ user, setUser ] = useState({
      username: '',
      email: '',
      password: ''
   });


   const { username, email, password } = user;

   
   const handleChange = (e) => {
      setUser({...user, [e.target.name] : e.target.value});
   }


   const handleSubmit = (e) => {
      e.preventDefault();

      // Validar aqui los campos del formulario en caso de ser necesario

      // Registrar al usuario
      registerUser({
         username: username,
         email: email,
         password: password
      });

      // Limpiar/Reiniciar el formulario
      setUser({ username: '', email: '', password: ''});
   }


   return(
      <div className="container">
         <div className="row justify-content-center align-items-center h-100 mt-4">
            <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
               <div className="border rounded shadow-sm p-4 my-3">

                  {message !== null ? (<div className="alert alert-danger" role="alert">{message}</div>) : null}

                  <form
                     onSubmit={handleSubmit}
                  >
                     <div className="form-group">
                        <label>User Name</label>
                        <input 
                           className="form-control" 
                           type="text"
                           name="username"
                           value={username} 
                           onChange={handleChange} 
                           required  
                        />
                     </div>
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
                     <button className="btn btn-block btn-primary mt-4" type="submit">Create account</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Register;