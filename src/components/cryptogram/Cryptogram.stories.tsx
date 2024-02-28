import React from 'react'

import { newCipher } from '../../lib/cipher'
import { getQuoteOfDay } from '../../lib/quotes'
import { Cryptogram } from './Cryptogram'

export default {
  title: 'Cryptogram',
  component: Cryptogram,
}
const solution = getQuoteOfDay(11)
const cipher = newCipher()

//const solution = ' "It\'s the friends you can call up at 4 a.m. that matter." -Marlene Dietrich'
const onChar = (input: string, ariaLabel: string) => {
  alert(`You clicked on ${ariaLabel}`)
}

export const Default = () => (
  <Cryptogram
    onChar={onChar}
    cipher={cipher}
    encryptedQuote={solution}
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
