import classnames from 'classnames'
import { ReactNode } from 'react'

import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { solution } from '../../lib/quotes'
import { CharStatus } from '../../lib/statuses'

const isPunctuation = (randomKey: string) => {
  return /\W/.test(randomKey)
}
type Props = {
  children?: ReactNode
  alphabetLine: string | null
  randomKey: string
  width?: number
  status?: CharStatus
  onClick: (input: string, ariaLabel: string) => void
  isRevealing?: boolean
}

export const Letter = ({
  children,
  status,
  width = 40,
  alphabetLine = '',
  randomKey,
  onClick,
  isRevealing,
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * solution.length
  const isHighContrast = getStoredIsHighContrastMode()
  const displayButton = !isPunctuation(randomKey)

  const classes = classnames(
    'xxshort:h-8 xxshort:w-8 xxshort:text-xxs xshort:w-10 xshort:h-10 flex short:h-12 h-14 items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white',
    {
      'transition ease-in-out': isRevealing,
      'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400':
        !status,
      'bg-slate-400 dark:bg-slate-800 text-white': status === 'absent',
      'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white':
        status === 'correct' && isHighContrast,
      'bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white':
        status === 'present' && isHighContrast,
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
        status === 'correct' && !isHighContrast,
      'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white':
        status === 'present' && !isHighContrast,
    }
  )

  const classesLetter = classnames(
    'xxshort:h-8 xxshort:w-8 xxshort:text-xxs xshort:w-10 xshort:h-10 flex short:h-12 h-14 items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none dark:text-white',
    {
      'transition ease-in-out': isRevealing,
    }
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
  }

  const stylesLetter = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const label = (event?.target as HTMLButtonElement)?.ariaLabel || ''

    onClick(randomKey, label)
    event.currentTarget.blur()
  }

  return (
    <div>
      <button
        style={displayButton ? styles : stylesLetter}
        aria-label={alphabetLine || ''}
        className={displayButton ? classes : classesLetter}
        onClick={handleClick}
      >
        {children || randomKey}
      </button>

      <span
        aria-label={alphabetLine || ''}
        style={stylesLetter}
        className={classesLetter}
      >
        {alphabetLine}
      </span>
    </div>
  )
}
