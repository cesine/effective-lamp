import {
  BugAntIcon,
  CalendarIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftIcon,
  CogIcon,
  HeartIcon,
  InformationCircleIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline'

import { ENABLE_ARCHIVED_GAMES } from '../../constants/settings'
import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setHint?: (value: boolean) => void
  setIsHeartModalOpen?: (value: boolean) => void
  setIsInfoModalOpen?: (value: boolean) => void
  setIsSendMessageModalOpen?: (value: boolean) => void
  setIsStatsModalOpen?: (value: boolean) => void
  setIsDatePickerModalOpen?: (value: boolean) => void
  setIsSettingsModalOpen?: (value: boolean) => void
}

export const Navbar = ({
  setHint,
  setIsHeartModalOpen,
  setIsInfoModalOpen,
  setIsSendMessageModalOpen,
  setIsStatsModalOpen,
  setIsDatePickerModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-content bg-claret px-2 pb-8 pt-8 text-white short:h-auto">
        <div className="flex">
          <InformationCircleIcon
            aria-label="Open Info Modal"
            className={`ml-3 h-6 w-6 dark:stroke-white ${
              setIsInfoModalOpen
                ? 'cursor-pointer'
                : 'cursor-not-allowed opacity-50'
            }`}
            onClick={() => {
              if (typeof setIsInfoModalOpen !== 'function') {
                return
              }
              window.gtag('event', 'unlock_achievement', {
                achievement_id: 'open_info_modal',
              })
              setIsInfoModalOpen(true)
            }}
            title="Show how to play"
          />
          {ENABLE_ARCHIVED_GAMES && (
            <CalendarIcon
              aria-label="Open Archived Games"
              className={`ml-3 h-6 w-6 dark:stroke-white ${
                setIsDatePickerModalOpen
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed opacity-50'
              }`}
              onClick={() => {
                if (typeof setIsDatePickerModalOpen !== 'function') {
                  return
                }
                window.gtag('event', 'unlock_achievement', {
                  achievement_id: 'open_archived_games',
                })
                setIsDatePickerModalOpen(true)
              }}
            />
          )}
          <HeartIcon
            aria-label="Open Heart Modal"
            className={`ml-3 h-6 w-6 dark:stroke-white ${
              setIsHeartModalOpen
                ? 'cursor-pointer'
                : 'cursor-not-allowed opacity-50'
            }`}
            onClick={() => {
              if (typeof setIsHeartModalOpen !== 'function') {
                return
              }
              window.gtag('event', 'unlock_achievement', {
                achievement_id: 'open_heart_modal',
              })
              setIsHeartModalOpen(true)
            }}
            title="Learn more how to give love to this game"
          />
        </div>
        <h1
          aria-label={GAME_TITLE}
          className="block truncate text-xl font-bold dark:text-white md:hidden"
        >
          {' '}
        </h1>
        <h1
          aria-label={GAME_TITLE}
          className="hidden truncate text-xl font-bold dark:text-white md:block"
        >
          <img src="/favicon.ico" alt="logo" className="mr-2 inline h-12" />{' '}
          {GAME_TITLE}
        </h1>

        <div className="right-icons">
          <a
            aria-label="Send a bug report"
            href="https://forms.gle/zRP8pAE1JrTEA5bWA"
            target="blank"
            rel="noopener noreferrer"
            className="ml-3 flex flex-col items-center"
          >
            <BugAntIcon
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => {
                window.gtag('event', 'unlock_achievement', {
                  achievement_id: 'click_send_a_bug_report',
                })
              }}
              title="Click to send me a bug report"
            />
            <span className="m-1 text-xs">Report</span>
          </a>
          <span
            aria-label="Send an encrypted message"
            className="ml-3 flex flex-col items-center"
            onClick={() => {
              if (typeof setIsSendMessageModalOpen !== 'function') {
                return
              }
              window.gtag('event', 'unlock_achievement', {
                achievement_id: 'click_send_a_message',
              })
              setIsSendMessageModalOpen(true)
            }}
            title="Click to write an encrypted message"
          >
            <ChatBubbleOvalLeftIcon
              className={`h-6 w-6 dark:stroke-white ${setIsSendMessageModalOpen ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
            />
            <span className="m-1 text-xs">Encrypt</span>
          </span>
          <span
            aria-label="Show Hint"
            className="ml-3 flex flex-col items-center"
            onClick={() => {
              if (typeof setHint !== 'function') {
                return
              }
              window.gtag('event', 'unlock_achievement', {
                achievement_id: 'click_show_hint',
              })
              setHint(true)
            }}
            title="Click to insert the hint"
          >
            <PuzzlePieceIcon
              className={`h-6 w-6 dark:stroke-white ${setHint ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
            />
            <span className="m-1 text-xs">Hint</span>
          </span>

          <ChartBarIcon
            aria-label="Open Stats"
            className={`ml-3 h-6 w-6 dark:stroke-white ${
              setIsStatsModalOpen
                ? 'cursor-pointer'
                : 'cursor-not-allowed opacity-50'
            }`}
            onClick={() => {
              if (typeof setIsStatsModalOpen !== 'function') {
                return
              }
              window.gtag('event', 'unlock_achievement', {
                achievement_id: 'open_stats',
              })
              setIsStatsModalOpen(true)
            }}
            title="Show stats"
          />

          <CogIcon
            aria-label="Open Settings"
            className={`ml-3 h-6 w-6 dark:stroke-white ${
              setIsSettingsModalOpen
                ? 'cursor-pointer'
                : 'cursor-not-allowed opacity-50'
            }`}
            onClick={() => {
              if (typeof setIsSettingsModalOpen !== 'function') {
                return
              }
              window.gtag('event', 'unlock_achievement', {
                achievement_id: 'open_settings',
              })
              setIsSettingsModalOpen(true)
            }}
            title="Open Settings"
          />
        </div>
      </div>
    </div>
  )
}
