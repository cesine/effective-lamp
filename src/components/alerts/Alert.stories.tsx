import React from 'react'

import { Alert } from './Alert'

export default {
  title: 'Alert',
  component: Alert,
}

export const Error = () => (
  <Alert isOpen={true} message="This is an error alert." variant="error" />
)

export const Success = () => (
  <Alert isOpen={true} message="This is a success alert." variant="success" />
)

export const TopMost = () => (
  <Alert isOpen={true} message="This is a top-most alert." topMost={true} />
)
