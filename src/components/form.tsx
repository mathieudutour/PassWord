import * as React from 'react'

import Button from './button'

import './form.css'

type Props = {
  onSubmit: (value: string) => void
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
}

const Form: React.FC<Props> = (props) => {
  const { placeholder, onValueChange, value, onSubmit } = props

  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <form
      name="Form"
      id="Form"
      className="uk-form"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(value)
      }}
    >
      <fieldset>
        <div className="uk-form-row uk-width-1-1 uk-form-password">
          <input
            className="uk-form-large uk-width-1-1"
            value={value}
            onChange={onValueChange}
            name="pass"
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            autoFocus
            aria-label={placeholder}
          />
          <a
            className="uk-form-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </a>
        </div>
        <div className="uk-form-row">
          <Button submit stickToBottom>
            Connection
          </Button>
        </div>
      </fieldset>
    </form>
  )
}

export default Form
