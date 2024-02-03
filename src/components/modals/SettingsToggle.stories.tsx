import React, { useState } from 'react'

import { SettingsToggle } from './SettingsToggle'

export default {
  title: 'SettingsToggle',
  component: SettingsToggle,
}

export const Default = () => {
  const [flag, setFlag] = useState(false)

  return (
    <SettingsToggle
      settingName="Example Setting"
      flag={flag}
      handleFlag={setFlag}
      description="This is an example setting."
    />
  )
}
