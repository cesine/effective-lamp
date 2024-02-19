import React from 'react'

import { newCipher } from '../../lib/cipher'
import { Alphabet } from './Alphabet'

const cipher = newCipher()

export default {
  title: 'Alphabet',
  component: Alphabet,
}

export const Default = () => (
  <Alphabet
    cipher={cipher}
    onChar={(value) => console.log('onChar', value)}
    onDelete={() => console.log('onDelete')}
    onEnter={() => console.log('onEnter')}
    solution="solution"
    guesses={['guess1', 'guess2']}
    isRevealing={true}
  />
)
