// Cade vez que se envie una petición al servidor podemos utilizar dichas funciones (middlewares) en las rutas que queramos para realizar validaciones antes de ejecutar la función del controlador. 
const jwt = require('jsonwebtoken');   

const User = require('../models/User');

// Verificar si un token existe, es valido o expiró.
exports.verifyToken = async (req, res, next) => {
   
   try {      
      // Verificar si existe un token almacenado en el HEADER (key: 'x-auth-token')
      const token = req.header('x-auth-token');  // console.log(token);   
      if (!token) return res.status(403).json({ message: 'No token provided!' }); 
   
      // Verificar si el token es válido: verify() decodifica y verifica si el valor del token almacenado en 'x-auth-token' machea con el valor de JWT_SECRET. Si machea retorna un objeto donde se encuentra almacenado el id del usuario (dato) { id: '5f61810cb394ef082828a7e3', iat: 1600225548, exp: 1600311948 } . Y si no machea va al catch y retorna el mensaje: 'jwt expired' || 'invalid token'.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // console.log(decoded);
      
      // Almacenar el id del usuario en una nueva propiedad llamada userIden y asignarsela al body para luego poder esta poder ser utilizada en el siguiente middleware o en la siguiente función de un controlador.
      req.userId = decoded.id;
      
      // Verificar si existe un usuario con dicho id  (AVERIGUAR PARA QUÉ ES NECESARIO).
      const user = await User.findById(req.userId);   
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      next();  // next() continúa con el siguiente middleware ó función de un controlador.

   } catch (error) {
      res.status(500).json({ message: error.message });  // 'jwt expired'  ||  'invalid token'
   }
}