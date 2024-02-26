import { fail } from 'assert'

import { QUOTES } from './quotelist'

// You may not want the list of solutions to be unique. In that case, disable this test
describe('quotelist', () => {
  test('quotes are unique', () => {
    const uniqueQuotes = Array.from(new Set(QUOTES))

    expect(QUOTES.length).toEqual(uniqueQUOTES.length)

    if (uniqueQuotes.length !== QUOTES.length) {
      uniqueQuotes.forEach((p) => {
        const quote = QUOTES.filter((x) => x === p)
        if (quote.length > 1) {
          fail(`The phrase ${p} is not unique.`)
        }
      })
    }
  })
})
