const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {  // signUp

   try {
      const { username, email, password } = req.body;

      // Revisar en la Base de Datos que no haya un usuario registrado con el mismo email.
      const emailExist = await User.findOne({ email: email }); // Retorna un objeto completo o vacio
      if (emailExist) return res.status(400).json({ message: 'User already exists' });

      // Hashear el password del Usuario
      const salt = await bcryptjs.genSalt(10);  // Genero un hash aleatorio. Repeticion del algoritmo: 10 
      const passwordHash = await bcryptjs.hash(password, salt);  // Hasheo el password del usuario.

      // Crear Usuario
      const newUser = new User({
         username: username,
         email: email,
         password: passwordHash
      });

      // Guardar Usuario en la Base de datos
      await newUser.save();

      // Retorno el usuario . OBS SIEMPRE DEBO RETORNAR ALGO. 
      res.status(200).json(newUser); 

   } catch (error) {
      res.status(500).json({ message: error.message });
   }    
}


exports.login = async (req, res) => {  // signIn

   try {
      const { email, password } = req.body;

      // Verificar si es un usuario que ya esta registrado.
      const user = await User.findOne({ email: email }); // Retorna un objeto (true) ó null (false).
      if (!user) return res.status(400).json({ message: 'The user not exist' });

      // Revisar si el password que nos envía el Usuario matchea con el password del usuario registrado.
      const matchPassword = await bcryptjs.compare(password, user.password); // Retorna un boolean. 
      if (!matchPassword) return res.status(400).json({ message: 'Invalid password' });


      // Crear el Token.
      
      // sign() recibe tres parámetros: 
      //1). Dato que se va guardar adentro del Token. (en este caso: el dato es el id del usuario). 
      //2). Palabra secreta que se va a utilizar para cifrar el dato del Token.
      //3). Tiempo de expiración del Token. (Ej: 24hs = 86400 seg.  ||  2 horas = 7200 seg. ).
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 });

      // Enviar el Token al cliente para que se almacene en el LocalStorage. 
      res.status(200).json({ token });

   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}


exports.getAuthenticatedUser = async (req, res) => {

   try {
      // console.log(req.userId);
      const userAuth = await User.findById(req.userId).select('-password');  // retorna el usuario (objeto) referente al id pasado por parámetro.
            
      res.status(200).json({userAuth});

   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}