import React from 'react'

import { Cryptogram } from './Cryptogram'

export default {
  title: 'Cryptogram',
  component: Cryptogram,
}

export const Default = () => (
  <Cryptogram
    solution="The early bird, catches the worm."
    isRevealing={true}
    currentRowClassName="example-class"
  />
)

/*export const WithoutRevealing = () => (
  <Cryptogram
    solution="flame"
    guesses={['grist', 'devote']}
currentGuess = "brawn"
isRevealing = { false}
currentRowClassName = "example-class"
  />
) */
