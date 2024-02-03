import React from 'react'

import { Keyboard } from './Keyboard'

export default {
  title: 'Keyboard',
  component: Keyboard,
}

export const Default = () => (
  <Keyboard
    onChar={(value) => console.log('onChar', value)}
    onDelete={() => console.log('onDelete')}
    onEnter={() => console.log('onEnter')}
    solution="solution"
    guesses={['guess1', 'guess2']}
    isRevealing={true}
  />
)
