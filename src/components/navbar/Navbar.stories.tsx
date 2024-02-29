import React from 'react'

import { Navbar } from './Navbar'

export default {
  title: 'Navbar',
  component: Navbar,
}

export const Default = () => (
  <Navbar
    setHint={(value) => console.log('setHint', value)}
    setIsInfoModalOpen={(value) => console.log('setIsInfoModalOpen', value)}
    setIsStatsModalOpen={(value) => console.log('setIsStatsModalOpen', value)}
    setIsDatePickerModalOpen={(value) =>
      console.log('setIsDatePickerModalOpen', value)
    }
    setIsSettingsModalOpen={(value) =>
      console.log('setIsSettingsModalOpen', value)
    }
  />
)
