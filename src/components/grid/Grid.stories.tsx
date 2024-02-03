import React from 'react'

import { Grid } from './Grid'

export default {
  title: 'Grid',
  component: Grid,
}

export const Default = () => (
  <Grid
    solution="flame"
    guesses={['grist', 'devote']}
    currentGuess="brawn"
    isRevealing={true}
    currentRowClassName="example-class"
  />
)

export const WithoutRevealing = () => (
  <Grid
    solution="flame"
    guesses={['grist', 'devote']}
    currentGuess="brawn"
    isRevealing={false}
    currentRowClassName="example-class"
  />
)
