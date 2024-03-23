import { QUOTES } from '@/constants/quotelist'

import {
  getIndex,
  getLastGameDate,
  getNextGameDate,
  getQuoteOfDay,
} from './quotes'

describe('solutionIndex', () => {
  test('last game date', () => {
    expect(getLastGameDate(new Date(2024, 5, 17))).toEqual(
      new Date(2024, 5, 17)
    )
    expect(getLastGameDate(new Date(2024, 5, 18))).toEqual(
      new Date(2024, 5, 18)
    )
    expect(getLastGameDate(new Date(2024, 5, 18, 15, 42, 0))).toEqual(
      new Date(2024, 5, 18)
    )

    expect(getLastGameDate(new Date(2024, 5, 23, 15, 42, 0))).toEqual(
      new Date(2024, 5, 23)
    )

    expect(getLastGameDate(new Date(2024, 5, 24))).toEqual(
      new Date(2024, 5, 24)
    )
    expect(getLastGameDate(new Date(2024, 5, 25))).toEqual(
      new Date(2024, 5, 25)
    )
    expect(getLastGameDate(new Date(2024, 5, 25, 15, 42, 0))).toEqual(
      new Date(2024, 5, 25)
    )
  })

  test('next game date', () => {
    expect(getNextGameDate(new Date(2024, 5, 17))).toEqual(
      new Date(2024, 5, 18)
    )
    expect(getNextGameDate(new Date(2024, 5, 18))).toEqual(
      new Date(2024, 5, 19)
    )
    expect(getNextGameDate(new Date(2024, 5, 18, 15, 42, 0))).toEqual(
      new Date(2024, 5, 19)
    )

    expect(getNextGameDate(new Date(2024, 5, 23, 15, 42, 0))).toEqual(
      new Date(2024, 5, 24)
    )

    expect(getNextGameDate(new Date(2024, 5, 24))).toEqual(
      new Date(2024, 5, 25)
    )
    expect(getNextGameDate(new Date(2024, 5, 25))).toEqual(
      new Date(2024, 5, 26)
    )
    expect(getNextGameDate(new Date(2024, 5, 25, 15, 42, 0))).toEqual(
      new Date(2024, 5, 26)
    )
  })

  test('index', () => {
    expect(getIndex(new Date(2024, 5, 15))).toEqual(166)

    expect(getIndex(new Date(2024, 5, 16))).toEqual(167)
    expect(getIndex(new Date(2024, 5, 17))).toEqual(168)
    expect(getIndex(new Date(2024, 5, 17, 15, 42, 0))).toEqual(168)

    expect(getIndex(new Date(2024, 5, 22, 15, 42, 0))).toEqual(173)

    expect(getIndex(new Date(2024, 5, 23))).toEqual(174)
  })

  test('quote of the day', () => {
    expect(() => getQuoteOfDay(-1)).toThrowError('Invalid index')
    expect(getQuoteOfDay(0).quote).toEqual(
      '“IT TAKES A GREAT DEAL OF COURAGE TO STAND UP TO YOUR ENEMIES, BUT EVEN MORE TO STAND UP TO YOUR FRIENDS.”'
    )
    expect(getQuoteOfDay(1).quote).toEqual(
      '"I’VE ALWAYS THOUGHT YOU’VE GOT TO BELIEVE IN LUCK TO GET IT."'
    )

    const quote = QUOTES.find(({ quote }, index) =>
      /by being yourself/i.test(quote)
        ? console.log('quote index', index)
        : null
    )

    console.log('quote', quote)
    expect(getQuoteOfDay(259).quote).toEqual(
      '"CHANGE THE WORLD BY BEING YOURSELF."'
    )
  })
})
