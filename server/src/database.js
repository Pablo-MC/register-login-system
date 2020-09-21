// Conexión a la Base de Datos (MongoDB) a traves de Mongoose.

const mongoose = require('mongoose');

exports.connectDB = async () => {
   try {
      await mongoose.connect(process.env.DB_MONGO, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      });
      console.log('DB is connected');  // Mensaje de conexión exitosa a la Base de Datos.
   } catch (error) {
      console.log(error);
      process.exit(1);  // En caso de que haya un error con la conexón a la base de datos, se detiene la app.
   }
}
