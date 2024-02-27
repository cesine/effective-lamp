// Key.stories.tsx
import React from 'react'

import { Letter } from './Letter'

export default {
  title: 'Letter',
  component: Letter,
}

export const Default = () => (
  <Letter
    alphabetLine="E"
    randomKey="A"
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithStatusAbsent = () => (
  <Letter
    alphabetLine="A"
    randomKey="B"
    status={'absent'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithStatusPresent = () => (
  <Letter
    alphabetLine="A"
    randomKey="B"
    status={'present'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithStatusCorrect = () => (
  <Letter
    alphabetLine="A"
    randomKey="B"
    status={'correct'}
    onClick={(value) => console.log('onClick', value)}
  />
)

export const WithChildren = () => (
  <Letter
    alphabetLine="A"
    randomKey="C"
    onClick={(value) => console.log('onClick', value)}
  >
    <span>Child</span>
  </Letter>
)
