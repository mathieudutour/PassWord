import * as React from 'react'

import './alert.css'

type Props = {
  children: string
  copyButton?: boolean
}

const Alert: React.FC<Props> = (props) => {
  const { copyButton, children } = props
  return <div className={`uk-alert`}>{children}</div>
}

export default Alert
