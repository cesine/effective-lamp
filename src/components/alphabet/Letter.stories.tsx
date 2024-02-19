// Key.stories.tsx
import React from 'react'

import { Letter } from './Letter'

export default {
  title: 'Letter',
  component: Letter,
}

export const Default = () => (
  <Letter value="A" onClick={(value) => console.log('onClick', value)} />
)

export const WithStatusAbsent = () => (
  <Letter
    value="B"
    status={'absent'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithStatusPresent = () => (
  <Letter
    value="B"
    status={'present'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithStatusCorrect = () => (
  <Letter
    value="B"
    status={'correct'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithChildren = () => (
  <Letter value="C" onClick={(value) => console.log('onClick', value)}>
    <span>Child</span>
  </Letter>
)
