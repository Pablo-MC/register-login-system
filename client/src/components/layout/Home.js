import React, { useContext } from 'react';

import authContext from '../../context/auth/authContext';


const Home = () => {

   const { authenticated } = useContext(authContext);

   return (
      <div className="container p-4">
         {authenticated
         ?
            <h1 className="text-center">¡Welcome!</h1>  
         :
            <h1 className="text-center h3">You need to login to enter the site...</h1>
         }
      </div>
   );
}

export default Home;