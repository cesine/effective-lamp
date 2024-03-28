import classnames from 'classnames'

import { REVEAL_TIME_MS } from '../../constants/settings'
import { CharStatus } from '../../lib/statuses'

let userHasInteractedWithLetter = false

type Props = {
  decryptedLetter: string | null
  encryptedLetter: string | null
  status?: CharStatus
  isHighContrast?: boolean
  isRevealing?: boolean
}

export const DragAndDropLetter = ({
  status,
  decryptedLetter = '',
  encryptedLetter = '',
  isHighContrast = false,
  isRevealing,
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS

  const classesLetter = classnames(
    'xxshort:h-6 xxshort:w-6 xxshort:text-xxs xshort:w-6 xshort:h-6 flex short:h-8 short:w-8 h-10 w-10 items-center justify-center rounded-full m-0.5 text-xl font-thin cursor-pointer select-none dark:text-white border-2 border-slate-600 dark:border-white',
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
      'transition ease-in-out': isRevealing,
    }
  )

  const stylesLetter = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
  }

  const handleDragStart: React.DragEventHandler<HTMLSpanElement> = (event) => {
    if (!userHasInteractedWithLetter) {
      userHasInteractedWithLetter = true
      window.gtag('event', 'unlock_achievement', {
        achievement_id: 'drag_alphabet_letter',
      })
    }
    const input = (event?.target as HTMLSpanElement)?.ariaLabel || ''
    event.dataTransfer.setData('text', input)
  }

  return (
    <span
      aria-label={decryptedLetter || ''}
      draggable={true}
      onDragStart={handleDragStart}
      style={stylesLetter}
      className={classesLetter}
      title="Drag and drop me to where you want me to go!"
    >
      {decryptedLetter}{' '}
      {encryptedLetter ? (
        <span className="thin" style={{ fontSize: '12px' }}>
          {encryptedLetter}
        </span>
      ) : null}
    </span>
  )
}
