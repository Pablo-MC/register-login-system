import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
// BrowserRouter es el componente que nos permite contener las rutas y los componentes de nuestra aplicación. 
// Switch es un componente que se encarga de contener UNICAMENTE las rutas (componente <Route>).
// Route se utiliza para especificar las rutas que se redirigirán a un componente especifico.

// Importante: En react siempre se trata de evitar que al hacer un click sobre un enlace se recarge la pagina, para que todo funcione desde la aplicación. Por lo tanto, para evitar que no se recarge debemos utilizar el componente Link del modulo react-router-dom. Link es basicamente como si fuera una etiqueta <a>. 

import AuthState from './context/auth/authState';

import Navigation from './components/layout/Navigation';
import Home from './components/layout/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import tokenAuth from './config/token';

// Al iniciar la app o al recargar el componente, enviamos (en caso de que exista) el token que esta almacenado en LocalStorage via HEADER al Backend.
tokenAuth();


const App = () => {
   return (
      <AuthState>
         <BrowserRouter> 
            <Navigation />                     
            <Switch>
               <Route exact path="/" component={Home} />               
               <Route path="/login" component={Login} />
               <Route path="/register" component={Register} />
               <Route path="*" component={() => '404 NOT FOUND'} />
            </Switch>
         </BrowserRouter>
      </AuthState>  
   );
}

export default App;


// el atributo exact permite que el componente se muestre unicamente cuando la ruta coincide exactamente con el nombre que escribimos en la URL.