import {
  getIndex,
  getLastGameDate,
  getNextGameDate,
  getQuoteOfDay,
} from './quotes'

describe('solutionIndex', () => {
  test('last game date', () => {
    expect(getLastGameDate(new Date(2022, 5, 17))).toEqual(
      new Date(2022, 5, 17)
    )
    expect(getLastGameDate(new Date(2022, 5, 18))).toEqual(
      new Date(2022, 5, 18)
    )
    expect(getLastGameDate(new Date(2022, 5, 18, 15, 42, 0))).toEqual(
      new Date(2022, 5, 18)
    )

    expect(getLastGameDate(new Date(2022, 5, 23, 15, 42, 0))).toEqual(
      new Date(2022, 5, 23)
    )

    expect(getLastGameDate(new Date(2022, 5, 24))).toEqual(
      new Date(2022, 5, 24)
    )
    expect(getLastGameDate(new Date(2022, 5, 25))).toEqual(
      new Date(2022, 5, 25)
    )
    expect(getLastGameDate(new Date(2022, 5, 25, 15, 42, 0))).toEqual(
      new Date(2022, 5, 25)
    )
  })

  test('next game date', () => {
    expect(getNextGameDate(new Date(2022, 5, 17))).toEqual(
      new Date(2022, 5, 18)
    )
    expect(getNextGameDate(new Date(2022, 5, 18))).toEqual(
      new Date(2022, 5, 19)
    )
    expect(getNextGameDate(new Date(2022, 5, 18, 15, 42, 0))).toEqual(
      new Date(2022, 5, 19)
    )

    expect(getNextGameDate(new Date(2022, 5, 23, 15, 42, 0))).toEqual(
      new Date(2022, 5, 24)
    )

    expect(getNextGameDate(new Date(2022, 5, 24))).toEqual(
      new Date(2022, 5, 25)
    )
    expect(getNextGameDate(new Date(2022, 5, 25))).toEqual(
      new Date(2022, 5, 26)
    )
    expect(getNextGameDate(new Date(2022, 5, 25, 15, 42, 0))).toEqual(
      new Date(2022, 5, 26)
    )
  })

  test('index', () => {
    expect(getIndex(new Date(2022, 5, 16))).toEqual(166)
    expect(getIndex(new Date(2022, 5, 17))).toEqual(167)
    expect(getIndex(new Date(2022, 5, 18))).toEqual(168)
    expect(getIndex(new Date(2022, 5, 18, 15, 42, 0))).toEqual(169)

    // Adjusted indices for the newly added quotes
    expect(getIndex(new Date(2022, 5, 19))).toEqual(170)
    expect(getIndex(new Date(2022, 5, 20))).toEqual(171)
    expect(getIndex(new Date(2022, 5, 21))).toEqual(172)
    expect(getIndex(new Date(2022, 5, 22))).toEqual(173)
    expect(getIndex(new Date(2022, 5, 23))).toEqual(174)
    expect(getIndex(new Date(2022, 5, 24))).toEqual(175)
  })

  test('quote of the day', () => {
    expect(() => getQuoteOfDay(-1)).toThrowError('Invalid index')
    expect(getQuoteOfDay(0).quote).toEqual(
      '“IT TAKES A GREAT DEAL OF COURAGE TO STAND UP TO YOUR ENEMIES, BUT EVEN MORE TO STAND UP TO YOUR FRIENDS.”'
    )
    expect(getQuoteOfDay(1).quote).toEqual(
      '"I’VE ALWAYS THOUGHT YOU’VE GOT TO BELIEVE IN LUCK TO GET IT."'
    )
    expect(getQuoteOfDay(255).quote).toEqual(
      '"CHANGE THE WORLD BY BEING YOURSELF."'
    )
  })
})
