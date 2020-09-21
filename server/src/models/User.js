// Creación del modelo de Usuarios. Colección 'users'.

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   username: { 
      type: String,
      trim: true, 
      required: true 
   },
   email: { 
      type: String, 
      trim: true, 
      required: true 
   },
   password: { 
      type: String, 
      required: true
   }
}, {
   timestamps: true,
   versionKey: false
});

module.exports = mongoose.model('User', UserSchema, 'users');

// unique: true -> determina que no puede haber dos emails/username iguales.  
// minlength: 5 -> determina que el campo debe tener un mínimo de 5 caracteres.