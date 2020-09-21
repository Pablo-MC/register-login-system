require('dotenv').config();  // Importar variables de entorno -> Acceder a una variable de entorno: process.env.NOMBRE_VARIABLE.

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database'); 

// Creación y configuración del Servidor LOCAL (app)
const app = express(); 

// Middlewares Express
app.use(cors());  // permite enviar y recibir datos entre el Frontend y el Backend.
app.use(express.json());  // permite al servidor interpretar formatos json que serán enviados por el cliente.

// Routes (Defición de las rutas del Servidor) - REST API
app.use('/api/auth', require('./routes/auth.routes'));

// Conexión a la Base de Datos
connectDB();

// Establecer el número de puerto al cual se va a conectar el servidor. 
// Cuando hagamos el deployment de nuestra aplicación en un hosting (Ej. Heroku, AWS, Linode, etc), por lo general los hostings nos dan un número de puerto aleatorio a traves de una variable de entorno llamada PORT que debemos usar para que nuestra aplicación funcione. Durante el desarrollo se usará el puerto 4000. (!== 3000 , puerto que usará el servidor del cliente).
const port = process.env.PORT || 4000; 


// Arrancar el servidor
app.listen(port, () => {
   console.log(`server on port ${port}`)
}); 