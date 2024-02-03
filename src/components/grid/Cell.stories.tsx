import React from 'react'

import { Cell } from './Cell'

export default {
  title: 'Cell',
  component: Cell,
}

export const Default = () => <Cell value="A" />

export const WithStatus = () => <Cell value="B" status={'correct'} />
