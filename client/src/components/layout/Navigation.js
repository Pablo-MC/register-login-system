import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import authContext from '../../context/auth/authContext';


const Navigation = () => {

   const { authenticated, logOut, getAuthenticatedUser } = useContext(authContext);

   useEffect(() => {
      getAuthenticatedUser();
      // eslint-disable-next-line
   }, []);


   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="container">
            <Link className="navbar-brand" to="/">
               App
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav ml-auto" data-toggle="collapse" data-target=".navbar-collapse">
                  {!authenticated
                  ?
                     <>
                        <li className="nav-item active">
                           <Link className="nav-link" to="/login">Log In</Link>
                        </li>
                     </>
                  :
                     <>
                        <li className="nav-item active">
                           <Link className="nav-link" to="/" onClick={logOut}>Log Out</Link>
                        </li>
                     </>
                  }
               </ul>
            </div>
         </div>
      </nav>
   );
}

export default Navigation;