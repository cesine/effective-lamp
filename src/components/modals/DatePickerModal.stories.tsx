import React, { useState } from 'react'

import { DatePickerModal } from './DatePickerModal'

export default {
  title: 'DatePickerModal',
  component: DatePickerModal,
}

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <DatePickerModal
      isOpen={isOpen}
      initialDate={new Date()}
      handleSelectDate={(date) => console.log('Selected date:', date)}
      handleClose={() => setIsOpen(false)}
    />
  )
}
