import React from 'react'
import { Link } from 'gatsby'

import './header.css'

const Header: React.FC = () => {
  return (
    <nav className="uk-navbar" role="navigation">
      <Link className="uk-navbar-brand" to="/">
        PassWord Wallet <span className="icon">🗝</span>
      </Link>
    </nav>
  )
}

export default Header
