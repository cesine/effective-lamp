import { fail } from 'assert'

import { PHRASES } from './phraselist'

// You may not want the list of solutions to be unique. In that case, disable this test
describe('phraselist', () => {
  test('phrases are unique', () => {
    const uniquePhrases = Array.from(new Set(PHRASES))

    expect(PHRASES.length).toEqual(uniquePhrases.length)

    if (uniquePhrases.length !== PHRASES.length) {
      uniquePhrases.forEach((p) => {
        const phrase = PHRASES.filter((x) => x === p)
        if (phrase.length > 1) {
          fail(`The phrase ${p} is not unique.`)
        }
      })
    }
  })
})
