import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { isNonNullExpression } from 'typescript'

import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { CharStatus } from '../../lib/statuses'

const isPunctuation = (decryptedValue: string) => {
  return /\W/.test(decryptedValue)
}

type Props = {
  encryptedValue: string
  decryptedValue?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
  onClick: (input: string, ariaLabel: string) => void
}

export const Cell = ({
  encryptedValue,
  decryptedValue,
  status,
  isRevealing,
  isCompleted,
  onClick,
  position = 0,
}: Props) => {
  const [revealLetter, setRevealLetter] = useState(false)
  const toggleRevealLetter = () => {
    setRevealLetter(!revealLetter)
  }
  const [guess, setGuess] = useState('')

  const isFilled = decryptedValue && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()
  const shouldDisplayDecrypted = decryptedValue
    ? !isPunctuation(decryptedValue)
    : false

  const classesEncrypted = classnames(
    'xxshort:w-4 xxshort:h-4 short:text-2xl short:w-6 short:h-6 w-8 h-8 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-white dark:border-black': !status,
    }
  )

  const classesDecrypted = classnames(
    'xxshort:w-4 xxshort:h-4 short:text-2xl short:w-6 short:h-6 w-8 h-8 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'correct shadowed bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct shadowed bg-green-500 text-white border-green-500':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-yellow-500 text-white border-yellow-500':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  const stylesDecrypted = {
    fontFamily: 'Courier New',
    animationDelay,
    minHeight: '1em',
  }

  const stylesEncrypted = {
    ...stylesDecrypted,
    marginBottom: '40px',
  }
  const cellOnClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const label = (event?.target as HTMLDivElement)?.ariaLabel || ''

    onClick('', label)
    event.currentTarget.blur()
  }

  function handleKeyDown(this: Window, ev: KeyboardEvent) {
    console.log(ev.key, decryptedValue)
    setGuess(ev.key.toLocaleUpperCase())
    setRevealLetter(true)
    window.removeEventListener('keydown', handleKeyDown)
  }
  return (
    <div className="inline-flex flex-col">
      <div
        aria-label={encryptedValue}
        onClick={cellOnClick}
        className={classesDecrypted}
        style={stylesDecrypted}
      >
        {decryptedValue}
      </div>

      <div
        aria-label={encryptedValue}
        style={stylesEncrypted}
        className={classesEncrypted}
      >
        {encryptedValue}
      </div>
    </div>
  )
}
