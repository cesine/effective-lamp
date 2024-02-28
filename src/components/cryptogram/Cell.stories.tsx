import React from 'react'

import { Cell } from './Cell'

export default {
  title: 'Cell',
  component: Cell,
}

const onClick = (input: string, ariaLabel: string) => {
  alert(`You clicked on ${ariaLabel}`)
}

export const Default = () => (
  <Cell encryptedValue="E" decryptedValue="A" onClick={onClick} />
)

export const WithStatus = () => (
  <Cell
    encryptedValue="E"
    decryptedValue="B"
    status={'correct'}
    onClick={onClick}
  />
)
