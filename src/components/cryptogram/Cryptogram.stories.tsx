import React from 'react'

import { getQuoteOfDay } from '../../lib/quotes'
import { Cryptogram } from './Cryptogram'

export default {
  title: 'Cryptogram',
  component: Cryptogram,
}
const solution = getQuoteOfDay(11)

//const solution = ' "It\'s the friends you can call up at 4 a.m. that matter." -Marlene Dietrich'

export const Default = () => (
  <Cryptogram
    solution={solution}
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
