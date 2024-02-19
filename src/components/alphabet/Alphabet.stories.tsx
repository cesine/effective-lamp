import React from 'react'

import { Alphabet } from './Alphabet'

export default {
  title: 'Alphabet',
  component: Alphabet,
}

export const Default = () => (
  <Alphabet
    onChar={(value) => console.log('onChar', value)}
    onDelete={() => console.log('onDelete')}
    onEnter={() => console.log('onEnter')}
    solution="solution"
    guesses={['guess1', 'guess2']}
    isRevealing={true}
  />
)
