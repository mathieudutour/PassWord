import * as React from 'react'

import './button.css'

type Props = {
  children: React.ReactNode
  full?: boolean
  onClick?: (e?: any) => void
  submit?: boolean
}

const Button: React.FC<Props> = (props) => {
  const { full, submit, onClick, children } = props
  return (
    <button
      className={`uk-button${full ? ' full' : ''}`}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  )
}

export default Button
