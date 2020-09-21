import React, { useReducer } from 'react';

// Importar Context y Reducer
import authContext from './authContext';
import authReducer from './authReducer';

// Importar ClienteAxios para hacer las peticiones al Backend.
import clientAxios from '../../config/axios';

import tokenAuth from '../../config/token';


import { 
   SUCCESS_REGISTER,
   SUCCESS_SIGNIN,
   FAILED_REGISTER,
   FAILED_SIGNIN,
   GET_USER,
   LOGOUT,
   HIDE_ALERT  
 } from '../../types';



const AuthState = (props) => {

   const initialState = {
      token: localStorage.getItem('token'),
      registered: null,
      authenticated: false,
      user: null,
      message: null
   }


   // Creación del state y el dispatch (useReducer)
   const [state, dispatch] = useReducer(authReducer, initialState);


   const registerUser = async (newUser) => {

      try {         
         await clientAxios.post('/api/auth/register', newUser);
         
         dispatch({
            type: SUCCESS_REGISTER
         })

      } catch (error) {

         dispatch({
            type: FAILED_REGISTER,
            payload: error.response.data.message  // User already exists
         })  
         
         // Después de 3 segundos limpiar la alerta
         setTimeout(() => {
            dispatch({
               type: HIDE_ALERT
            })
         }, 3000);
      }
   }


   const signIn = async (user) => {

      try {
         const res = await clientAxios.post('/api/auth/login', user);   

         dispatch({
            type: SUCCESS_SIGNIN,
            payload: res.data.token   // res.data.token contiene el Token
         })  

         // Guardo en el State 'user' el usuario autenticado.
         getAuthenticatedUser();

      } catch (error) {

         dispatch({
            type: FAILED_SIGNIN,
            payload: error.response.data.message  // The user not exist  ||  Invalid password
         })
         
         // Después de 3 segundos limpiar la alerta
         setTimeout(() => {
            dispatch({
               type: HIDE_ALERT
            })
         }, 3000);
      }
   }


   const logOut = () => {

      dispatch({
         type: LOGOUT  // Eliminar el token del localStorage y recetar TODOS los valores del initialState.
      })
   }


   const getAuthenticatedUser = async () => {
      
      try {
         
         // Enviar el token al Backend. 
         tokenAuth();
      
         const res = await clientAxios.get('/api/auth');

         dispatch({
            type: GET_USER,
            payload: res.data.userAuth  // contiene TODOS los datos del usuario menos el password.
         })

      } catch (error) {
         console.log(error.response.data.message);  // 'No token provided' || 'The token expired'

         dispatch({
            type: LOGOUT  // En caso de que el usuario no este autenticado entonces eliminamos el token del localStorage y reseteaemos TODOS los valores del initialState.
         })
      }
   }


   return (
      <authContext.Provider
         value={{
            token: state.token,
            registered: state.registered,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message,
            registerUser,
            signIn,
            logOut,
            getAuthenticatedUser

         }}
      >
         {props.children}
      </authContext.Provider>
      
   );
}

export default AuthState;