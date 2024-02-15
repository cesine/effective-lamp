// CurrentRow.stories.tsx
import React from 'react'

import { DecryptedLine } from './DecryptedLine'

export default {
  title: 'DecryptedLine',
  component: DecryptedLine,
}

export const Default = () => (
  <DecryptedLine guess="guess" className="example-class" />
)

export const WithLongGuess = () => (
  <DecryptedLine guess="longer guess" className="example-class" />
)
