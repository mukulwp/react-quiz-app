import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Layout.css';

const Layout = ({children}) => {
  return (
      <>
          <Navbar />
          <main className="main">
              <div className="container">
                  {children}
              </div>
          </main>
      </>
  )
}

export default Layout