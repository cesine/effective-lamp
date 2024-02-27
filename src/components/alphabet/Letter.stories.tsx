// Key.stories.tsx
import React from 'react'

import { Letter } from './Letter'

export default {
  title: 'Letter',
  component: Letter,
}

export const Default = () => (
  <Letter
    encryptedValue="E"
    value="A"
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithStatusAbsent = () => (
  <Letter
    encryptedValue="A"
    value="B"
    status={'absent'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithStatusPresent = () => (
  <Letter
    encryptedValue="A"
    value="B"
    status={'present'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithStatusCorrect = () => (
  <Letter
    encryptedValue="A"
    value="B"
    status={'correct'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithChildren = () => (
  <Letter
    encryptedValue="A"
    value="C"
    onClick={(value) => console.log('onClick', value)}
  >
    <span>Child</span>
  </Letter>
)
