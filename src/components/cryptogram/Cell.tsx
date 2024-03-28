import classnames from 'classnames'
import { RefObject, createRef } from 'react'

import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { CharStatus } from '../../lib/statuses'

const isaLetter = (decryptedValue: string) => {
  return /[a-zA-Z]+/.test(decryptedValue)
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
const isIphone = /iPhone/i.test(navigator.userAgent)
let userHasInteractedWithCell = false
let userHasDroppedALetter = false

export const Cell = ({
  encryptedValue,
  decryptedValue,
  status,
  isRevealing,
  isCompleted,
  onClick,
  position = 0,
}: Props) => {
  // const [revealLetter, setRevealLetter] = useState(isRevealing)
  // const toggleRevealLetter = () => {
  //   setRevealLetter(!revealLetter)
  // }

  const isFilled = decryptedValue && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()
  const shouldDisplayDecrypted = isaLetter(encryptedValue)

  const classesEncrypted = classnames(
    'xxshort:w-4 xxshort:h-4 short:text-2xl short:w-6 short:h-6 w-8 h-8 flex items-center justify-center mx-0.5 text-4xl font-thin rounded dark:text-white',
    {
      'bg-white dark:bg-federal-blue': !status,
    }
  )
  const classesPunctuation = classnames(
    'flex items-center justify-center mx-0.5 text-4xl font-thin dark:text-white'
  )

  const classesDecrypted = classnames(
    'xxshort:w-4 xxshort:h-4 short:text-2xl short:w-6 short:h-6 w-8 h-8 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-thin rounded dark:text-white',
    {
      'hover:bg-slate-500 active:bg-slate-400 dark:border-federal-blue-700':
        !status,
      'absent border-federal-blue-400 hover:bg-slate-500 active:bg-slate-400 dark:border-federal-blue-700':
        status === 'absent',
      'correct shadowed bg-cyan-500 hover:bg-orange-600 active:bg-orange-700 text-white border-cyan-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-orange-500 hover:bg-cyan-600 active:bg-cyan-700 text-white border-orange-500':
        status === 'present' && isHighContrast,
      'correct shadowed bg-green-700 hover:bg-green-600 active:bg-green-700 text-white border-green-700':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-dark-goldenrod hover:bg-yellow-500 active:bg-yellow-700 text-white border-dark-goldenrod':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  const stylesDecrypted = {
    fontFamily: 'Courier New',
    animationDelay,
    minHeight: '1em',
    minWidth: '1em',
  }

  const stylesPunctuation = {
    fontFamily: 'Courier New',
    animationDelay,
    minHeight: '1em',
    minWidth: '0.2em',
  }

  const stylesEncrypted = {
    ...stylesDecrypted,
    marginBottom: '0.5em',
  }

  const allowDrop: React.DragEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
  }

  const onDrop: React.DragEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    var input = event.dataTransfer.getData('text')
    onClick(input, encryptedValue)
    if (!userHasDroppedALetter) {
      userHasDroppedALetter = true
      window.gtag('event', 'unlock_achievement', {
        achievement_id: 'drop_on_cryptogam_cell',
      })
    }
  }

  const cellOnClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!userHasInteractedWithCell) {
      userHasInteractedWithCell = true
      window.gtag('event', 'unlock_achievement', {
        achievement_id: 'click_cryptogram_cell',
      })
    }
    const label = (event?.target as HTMLButtonElement)?.ariaLabel || ''

    onClick('', label)
    if (isIphone) {
      event.currentTarget.blur()
      hiddenInputRef?.current?.focus()
    }
  }

  const notTabbable = shouldDisplayDecrypted ? {} : { tabIndex: -1 }
  const hiddenInputRef: RefObject<HTMLInputElement> = createRef()
  return (
    <div className="inline-flex flex-col">
      <button
        aria-label={encryptedValue}
        className={
          shouldDisplayDecrypted ? classesDecrypted : classesPunctuation
        }
        onClick={cellOnClick}
        onDragOver={allowDrop}
        onDrop={onDrop}
        style={shouldDisplayDecrypted ? stylesDecrypted : stylesPunctuation}
        {...notTabbable}
      >
        {shouldDisplayDecrypted ? decryptedValue : null}
        <input
          ref={hiddenInputRef}
          style={{ position: 'absolute', top: '-9999px' }}
          tabIndex={-1}
          type="text"
        />
      </button>

      <div
        aria-label={encryptedValue}
        style={shouldDisplayDecrypted ? stylesEncrypted : stylesPunctuation}
        className={
          shouldDisplayDecrypted ? classesEncrypted : classesPunctuation
        }
      >
        {encryptedValue}
      </div>
    </div>
  )
}
