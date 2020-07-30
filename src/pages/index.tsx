import React from 'react'
import copy from 'copy-to-clipboard'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Form from '../components/form'
import Alert from '../components/alert'

import { generatePassword } from '../password'

import './index.css'

const IndexPage = () => {
  const [salt, setSalt] = React.useState<string | null>(null)
  const [value, setValue] = React.useState<string>('')
  const [password, setPassword] = React.useState<string | null>(null)

  return (
    <Layout>
      <SEO title="Password Wallet" />

      {password ? (
        <Alert copyButton>{password}</Alert>
      ) : salt ? (
        <Alert>You are now connected.</Alert>
      ) : null}

      <Form
        value={value}
        onValueChange={(e) => setValue(e.currentTarget.value)}
        placeholder={salt ? 'Website ID' : 'Master password'}
        onSubmit={(value) => {
          if (!value) {
            return
          }
          if (!salt) {
            setSalt(value)
            setValue('')
          } else {
            const newPassword = generatePassword(value, salt)
            setPassword(newPassword)
            copy(newPassword, { format: 'text/plain', debug: true })
          }
        }}
      />
    </Layout>
  )
}

export default IndexPage
