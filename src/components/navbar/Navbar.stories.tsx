import React from 'react'

import { Navbar } from './Navbar'

export default {
  title: 'Navbar',
  component: Navbar,
}

export const Default = () => (
  <Navbar
    setHint={(value) => console.log('setHint', value)}
    setIsHeartModalOpen={(value) => console.log('setIsHeartModalOpen', value)}
    setIsInfoModalOpen={(value) => console.log('setIsInfoModalOpen', value)}
    setIsSendMessageModalOpen={(value) =>
      console.log('setIsSendMessageModalOpen', value)
    }
    setIsStatsModalOpen={(value) => console.log('setIsStatsModalOpen', value)}
    setIsDatePickerModalOpen={(value) =>
      console.log('setIsDatePickerModalOpen', value)
    }
    setIsSettingsModalOpen={(value) =>
      console.log('setIsSettingsModalOpen', value)
    }
  />
)
