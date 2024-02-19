import React from 'react'

import { CompletedRow } from './EncryptedRow'

export default {
  title: 'CompletedRow',
  component: CompletedRow,
}

export const Default = () => (
  <CompletedRow solution="solution" guess="guess" isRevealing={true} />
)

export const WithoutRevealing = () => (
  <CompletedRow solution="solution" guess="guess" />
)
