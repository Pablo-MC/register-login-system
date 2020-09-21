import clientAxios from './axios';

// Fn utilizada para enviar el token al backend cada vez que el usuario realiza una petición.
const tokenAuth = () => {
   
   const token = localStorage.getItem('token');  // token ->  string (true)  ||  null (false).

   // En caso de que haya un token almacenado en LocalStorage entonces lo enviamos al HEADER como VALUE del KEY 'x-auth-token' hacia backend, caso contrario eliminamos el VALUE del KEY 'x-auth-token'.

   if (token) {
      clientAxios.defaults.headers.common['x-auth-token'] = token;
   } else { 
      delete clientAxios.defaults.headers.common['x-auth-token'];
   }
}

export default tokenAuth; 


