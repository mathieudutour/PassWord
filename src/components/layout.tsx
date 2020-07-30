import React from 'react'
import './layout.css'

import Header from './header'

const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main className="uk-width-9-10 uk-container-center">{children}</main>
    </React.Fragment>
  )
}

export default Layout
