import * as React from 'react'

import './button.css'

type Props = {
  children: React.ReactNode
  stickToBottom?: boolean
  onClick?: (e?: any) => void
  submit?: boolean
}

const Button: React.FC<Props> = (props) => {
  const { stickToBottom, submit, onClick, children } = props
  return (
    <button
      className={`uk-button${stickToBottom ? ' stickToBottom' : ''}`}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  )
}

export default Button
