import {
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline'

import { ENABLE_ARCHIVED_GAMES } from '../../constants/settings'
import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setHint: (value: boolean) => void
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsDatePickerModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setHint,
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsDatePickerModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-content px-5 short:h-auto">
        <div className="flex">
          <InformationCircleIcon
            aria-label="Open Info Modal"
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
            title="Show how to play"
          />
          {ENABLE_ARCHIVED_GAMES && (
            <CalendarIcon
              aria-label="Open Archived Games"
              className="ml-3 h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => setIsDatePickerModalOpen(true)}
            />
          )}
        </div>
        <p className="block truncate text-xl font-bold dark:text-white md:hidden">
          Cryptogram
        </p>
        <p className="hidden truncate text-xl font-bold dark:text-white md:block">
          {GAME_TITLE}
        </p>
        <div className="right-icons">
          <PuzzlePieceIcon
            aria-label="Show Hint"
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setHint(true)}
            title="Click to insert the hint"
          />

          <ChartBarIcon
            aria-label="Open Stats"
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
            title="Show stats"
          />
          <CogIcon
            aria-label="Open Settings"
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
            title="Open Settings"
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
