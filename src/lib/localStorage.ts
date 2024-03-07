import { Solution } from './quotes'
import { CharStatus } from './statuses'

const gameStateKey = 'gameState'
const archiveGameStateKey = 'archiveGameState'
const highContrastKey = 'highContrast'

export type Guess = {
  input: string
  label?: string
  status?: CharStatus
}

export type StoredGameState = {
  gameWasWon: boolean
  guesses: Guess[]
  incorrectGuesses: Guess[]
  solution: Solution
}

export const saveGameStateToLocalStorage = (
  isLatestGame: boolean,
  gameState: StoredGameState
) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  localStorage.setItem(key, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = (isLatestGame: boolean) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  const state = localStorage.getItem(key)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

declare global {
  interface Window {
    gtag: any
  }
}

let firstGame = true
export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  if (!stats && firstGame) {
    firstGame = false
    window.gtag('event', 'sign_up', {
      method: 'Anonymous',
    })
  }
  return stats ? (JSON.parse(stats) as GameStats) : null
}

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1')
  } else {
    localStorage.removeItem(highContrastKey)
  }
}

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey)
  return highContrast === '1'
}
