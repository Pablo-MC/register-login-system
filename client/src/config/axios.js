// Utilización del modulo axios del lado del cliente para enviar las peticiones hacia el Backend.

import axios from 'axios';

const clientAxios = axios.create({
   baseURL: process.env.REACT_APP_BACKEND_URL
})

export default clientAxios;


// OBS: De esta forma siempre que mande a llamar a este clienteAxios va a tener una URL como base. Luego cuando registremos la variable de entorno en producción, solamente registramos REACT_APP_BACKEND_URL donde haya quedado nuestro proyecto y de esa forma TODOS los lugares a donde estamos haciendo consultas van a actualizarse hacia ese nuevo Backend. 
