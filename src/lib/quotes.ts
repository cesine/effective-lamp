import {
  addDays,
  differenceInDays,
  formatISO,
  parseISO,
  startOfDay,
} from 'date-fns'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import queryString from 'query-string'

import { QUOTES } from '../constants/quotelist'
import { NOT_CONTAINED_MESSAGE, WRONG_SPOT_MESSAGE } from '../constants/strings'
import { VALID_GUESSES } from '../constants/validGuesses'
import { getToday } from './dateutils'
import { getGuessStatuses } from './statuses'

// 1 January 2022 Game Epoch
export const firstGameDate = new Date(2022, 0)
export const periodInDays = 1

export const isQuoteInQuoteList = (quote: string) => {
  return (
    QUOTES.includes(localeAwareLowerCase(quote)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(quote))
  )
}

export const isWinningQuote = (quote: string) => {
  return solution === quote
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (quote: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(solution, guess)
  const splitQuote = unicodeSplit(quote)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitQuote[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitQuote) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (quote: string) => {
  return new GraphemeSplitter().splitGraphemes(quote)
}

export const unicodeLength = (quote: string) => {
  return unicodeSplit(quote).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getLastGameDate = (today: Date) => {
  const t = startOfDay(today)
  let daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays
  return addDays(t, -daysSinceLastGame)
}

export const getNextGameDate = (today: Date) => {
  return addDays(getLastGameDate(today), periodInDays)
}

export const isValidGameDate = (date: Date) => {
  if (date < firstGameDate || date > getToday()) {
    return false
  }

  return differenceInDays(firstGameDate, date) % periodInDays === 0
}

export const getIndex = (gameDate: Date) => {
  let start = firstGameDate
  let index = -1
  do {
    index++
    start = addDays(start, periodInDays)
  } while (start <= gameDate)

  return index
}

export const getQuoteOfDay = (index: number) => {
  if (index < 0) {
    throw new Error('Invalid index')
  }

  return localeAwareUpperCase(QUOTES[index % QUOTES.length])
}

export const getSolution = (gameDate: Date) => {
  const queryParams = new URLSearchParams(window.location.search)
  const gameFromQueryParams = loadGameStateFromQueryParam(queryParams)

  const nextGameDate = getNextGameDate(gameDate)
  const index = gameFromQueryParams.index
    ? gameFromQueryParams.index
    : getIndex(gameDate)
  const quoteOfTheDay = gameFromQueryParams.solution
    ? gameFromQueryParams.solution
    : getQuoteOfDay(index)
  return {
    message: gameFromQueryParams.message ? gameFromQueryParams.message : '',
    solution: quoteOfTheDay,
    solutionGameDate: gameDate,
    solutionIndex: index,
    tomorrow: nextGameDate.valueOf(),
  }
}

export const getGameDate = () => {
  if (getIsLatestGame()) {
    return getToday()
  }

  const parsed = queryString.parse(window.location.search)
  try {
    const d = startOfDay(parseISO(parsed.d!.toString()))
    if (d >= getToday() || d < firstGameDate) {
      setGameDate(getToday())
    }
    return d
  } catch (e) {
    console.log(e)
    return getToday()
  }
}

export const setGameDate = (d: Date) => {
  try {
    if (d < getToday()) {
      window.location.href = '/?d=' + formatISO(d, { representation: 'date' })
      return
    }
  } catch (e) {
    console.log(e)
  }
  window.location.href = '/'
}

export const getIsLatestGame = () => {
  const parsed = queryString.parse(window.location.search)
  // TODO use URLparams and return true if no d or code is set
  return parsed === null || !('d' in parsed)
}

export type QueryParamGameState = {
  guesses: string[]
  index: number
  message?: string
  solution: string
}

const emptyGame = { guesses: [], index: 1, solution: '' }

export const loadGameStateFromQueryParam = (
  queryParams: URLSearchParams
): QueryParamGameState => {
  try {
    const code = queryParams.get('code')
    const stateString = code ? atob(code) : '{}'
    const state = stateString
      ? (JSON.parse(stateString) as QueryParamGameState)
      : emptyGame
    if (state.solution) {
      console.log('Loaded a game from query params', state)
    }
    return state
  } catch (err) {
    console.warn('Error laoding game from query params, ignoring it', err)
  }
  return emptyGame
}

export const { message, solution, solutionGameDate, solutionIndex, tomorrow } =
  getSolution(getGameDate())
