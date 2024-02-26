import React from 'react'

import { Cryptogram } from './Cryptogram'

export default {
  title: 'Cryptogram',
  component: Cryptogram,
}

export const Default = () => (
  <Cryptogram
    solution=' "It&rsquo;s the friends you can call up at 4 a.m. that matter." Marlene Dietrich'
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
