import React from 'react'

import { Cell } from './Cell'

export default {
  title: 'Cell',
  component: Cell,
}

export const Default = () => <Cell encryptedValue="E" value="A" />

export const WithStatus = () => (
  <Cell encryptedValue="E" value="B" status={'correct'} />
)
