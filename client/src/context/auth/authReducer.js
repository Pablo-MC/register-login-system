import {
   SUCCESS_REGISTER,
   SUCCESS_SIGNIN,
   FAILED_REGISTER,
   FAILED_SIGNIN,
   GET_USER,
   LOGOUT,
   HIDE_ALERT
} from '../../types';


export default (state, action) => {
   switch (action.type) {

      case SUCCESS_REGISTER:
         return {
            ...state,
            registered: true
         }

      case FAILED_REGISTER:
         return {
            ...state,
            message: action.payload
         }

      case SUCCESS_SIGNIN:
         // Almacenar el token en LocalStorage. (devTools > application > LocalStorage)
         localStorage.setItem('token', action.payload); 
         return {
            ...state,
            authenticated: true,
            message: null
         }

      case FAILED_SIGNIN:
         return {
            ...state,
            message: action.payload
         }   
      
      case GET_USER:
         return {
            ...state,
            authenticated: true,
            user: action.payload
         }   
      
      case LOGOUT:
         localStorage.removeItem('token');
         return {
            ...state,
            token: null,
            user: null,
            authenticated: null,
            registered: null
         }

      case HIDE_ALERT:
         return {
            message: null
         }   

      default:
         return state;
   }
}