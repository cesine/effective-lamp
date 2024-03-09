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

let userHasInteractedWithCell = false
const isIphone = /iPhone/i.test(navigator.userAgent)

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
      'bg-white dark:bg-slate-900': !status,
    }
  )

  const classesDecrypted = classnames(
    'xxshort:w-4 xxshort:h-4 short:text-2xl short:w-6 short:h-6 w-8 h-8 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-thin rounded dark:text-white',
    {
      'hover:bg-slate-300 active:bg-slate-400 dark:border-slate-700': !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'correct shadowed bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct shadowed bg-green-500 hover:bg-green-600 active:bg-green-700 text-white border-green-500':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white border-yellow-500':
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
  const hiddenInputRef: RefObject<HTMLInputElement> = createRef()

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

  return (
    <div className="inline-flex flex-col">
      <button
        aria-label={encryptedValue}
        onClick={cellOnClick}
        className={shouldDisplayDecrypted ? classesDecrypted : classesEncrypted}
        style={stylesDecrypted}
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
        style={stylesEncrypted}
        className={classesEncrypted}
      >
        {encryptedValue}
      </div>
    </div>
  )
}
