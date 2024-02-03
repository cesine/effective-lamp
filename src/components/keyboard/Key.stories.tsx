// Key.stories.tsx
import React from 'react'

import { Key } from './Key'

export default {
  title: 'Key',
  component: Key,
}

export const Default = () => (
  <Key value="A" onClick={(value) => console.log('onClick', value)} />
)

export const WithStatusAbsent = () => (
  <Key
    value="B"
    status={'absent'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithStatusPresent = () => (
  <Key
    value="B"
    status={'present'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithStatusCorrect = () => (
  <Key
    value="B"
    status={'correct'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithChildren = () => (
  <Key value="C" onClick={(value) => console.log('onClick', value)}>
    <span>Child</span>
  </Key>
)
