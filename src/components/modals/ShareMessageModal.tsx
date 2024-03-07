import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { solutionIndex } from '../..//lib/quotes'
import { GameStats, StoredGameState } from '../../lib/localStorage'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export type ShareMessage = {
  statistics: GameStats
  gameState: StoredGameState | null
}

export const ShareMessageModal = ({ isOpen, handleClose }: Props) => {
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false)

  const textareaClassNames = {
    valid: ['bg-gray-100', 'dark:bg-gray-700'],
    invalid: ['bg-red-400', 'dark:bg-red-900'],
  }
  const allClassNames = [
    ...textareaClassNames.valid,
    ...textareaClassNames.invalid,
  ]

  const handleImmigrationCodeChange = (event: any) => {
    if (event.target instanceof Element) {
      const textarea = event.target

      allClassNames.forEach((cn) => textarea.classList.remove(cn))

      setIsSaveButtonEnabled(false)

      const text = textarea.value

      try {
        const messsage = text
        if (!messsage) {
          textareaClassNames.invalid.forEach((cn) => textarea.classList.add(cn))
          return
        }

        textareaClassNames.valid.forEach((cn) => textarea.classList.add(cn))
        setIsSaveButtonEnabled(true)
      } catch (error) {
        textareaClassNames.invalid.forEach((cn) => textarea.classList.add(cn))
      }
    }
  }

  const handleSaveButton = () => {
    const textarea = document.getElementById(
      'share-message'
    ) as HTMLInputElement
    window.gtag('event', 'unlock_achievement', {
      achievement_id: 'share_encrypted_message',
    })
    if (
      textarea &&
      window.confirm(
        'Are you sure you want to open the encrypted message on this device?'
      )
    ) {
      const state = {
        guesses: [],
        index: solutionIndex,
        message: 'An encrypted message',
        solution: textarea.value,
      }

      const code = btoa(JSON.stringify(state))
      console.log('code', code)
      window.gtag('event', 'unlock_achievement', {
        achievement_id: 'open_shared_encrypted_message',
      })
      const queryParams = new URLSearchParams(window.location.search)
      queryParams.set('code', code)
      window.location.replace(
        `${window.location.pathname}?${queryParams.toString()}`
      )
    }
  }

  return (
    <BaseModal
      title="Encrypt your message"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="text-sm text-gray-500 dark:text-gray-300">
        <label
          htmlFor="message"
          className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Type or paste a message into the input:
        </label>
        <textarea
          onChange={(e) => handleImmigrationCodeChange(e)}
          id="share-message"
          rows={8}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        ></textarea>
        <button
          disabled={!isSaveButtonEnabled}
          onClick={handleSaveButton}
          type="button"
          className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-left text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-gray-200
          disabled:bg-white disabled:text-gray-900 disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-sm"
        >
          {isSaveButtonEnabled && (
            <ArrowRightEndOnRectangleIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
          )}
          Save
        </button>
      </div>
    </BaseModal>
  )
}
