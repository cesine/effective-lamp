import { QUOTES } from '@/constants/quotelist'

import {
  getIndex,
  getLastGameDate,
  getNextGameDate,
  getQuoteOfDay,
  loadGameStateFromQueryParam,
  shareGameToQueryParams,
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
      '“THE ONLY ONE WHO GETS TO DECIDE YOUR WORTH IS YOU.”'
    )
  })
  test('loadGameStateFromQueryParam', () => {
    const puzzles = [
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJBIGxvdCBvZiBwZW9wbGUgYXJlIGFmcmFpZCB0byBzYXkgd2hhdCB0aGV5IHdhbnQuIFRoYXQncyB3aHkgdGhleSBkb24ndCBnZXQgd2hhdCB0aGV5IHdhbnQuIFx0TWFkb25uYVxuIn19',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJJdCB0YWtlcyBhIGdyZWF0IGRlYWwgb2YgY291cmFnZSB0byBzdGFuZCB1cCB0byB5b3VyIGVuZW1pZXMsIGJ1dCBldmVuIG1vcmUgdG8gc3RhbmQgdXAgdG8geW91ciBmcmllbmRzLlx0Si5LLiBSb3dsaW5nXG4ifX0%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJJIGRvbid0IGhhdmUgdG8gY2hhc2UgZXh0cmFvcmRpbmFyeSBtb21lbnRzIHRvIGZpbmQgaGFwcGluZXNzIC0gaXQncyByaWdodCBpbiBmcm9udCBvZiBtZSBpZiBJJ20gcGF5aW5nIGF0dGVudGlvbiBhbmQgcHJhY3RpY2luZyBncmF0aXR1ZGUuIFx0QnJlbmUgQnJvd25cbiJ9fQ%253D%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJJIHJhaXNlIHVwIG15IHZvaWNlIC0gbm90IHNvIEkgY2FuIHNob3V0LCBidXQgc28gdGhhdCB0aG9zZSB3aXRob3V0IGEgdm9pY2UgY2FuIGJlIGhlYXJkLlx0TWFsYWxhIFlvdXNhZnphaVxuIn19',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJJJ3ZlIGFsd2F5cyB0aG91Z2h0IHlvdSd2ZSBnb3QgdG8gYmVsaWV2ZSBpbiBsdWNrIHRvIGdldCBpdC5cdFZpY3RvcmlhIEhvbHRcbiJ9fQ%253D%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJJZiB5b3UgaGF2ZSBiZWVuIGJydXRhbGx5IGJyb2tlbiBidXQgc3RpbGwgaGF2ZSB0aGUgY291cmFnZSB0byBiZSBnZW50bGUgdG8gb3RoZXJzLCB0aGVuIHlvdSBkZXNlcnZlIGEgbG92ZSBkZWVwZXIgdGhhbiB0aGUgb2NlYW4gaXRzZWxmLlx0TmlraXRhIEdpbGxcbiJ9fQ%253D%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJJZiB5b3Ugb2JleSBhbGwgdGhlIHJ1bGVzLCB5b3UgbWlzcyBhbGwgdGhlIGZ1bi5cdEthdGhhcmluZSBIZXBidXJuXG4ifX0%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJJZiB5b3UncmUgZ29pbmcgdG8gYmUgYWJsZSB0byBsb29rIGJhY2sgb24gc29tZXRoaW5nIGFuZCBsYXVnaCBhYm91dCBpdCwgeW91IG1pZ2h0IGFzIHdlbGwgbGF1Z2ggYWJvdXQgaXQgbm93LiBcdE1hcmllIE9zbW9uZFxuIn19',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJMb3ZlIHlvdXJzZWxmIGZpcnN0IGFuZCBldmVyeXRoaW5nIGVsc2UgZmFsbHMgaW50byBsaW5lLiBZb3UgcmVhbGx5IGhhdmUgdG8gbG92ZSB5b3Vyc2VsZiB0byBnZXQgYW55dGhpbmcgZG9uZSBpbiB0aGlzIHdvcmxkLlx0THVjaWxsZSBCYWxsXG4ifX0%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJUaGUgYmlnIHNlY3JldCBpbiBsaWZlIGlzIHRoYXQgdGhlcmUgaXMgbm8gc2VjcmV0LiBXaGF0ZXZlciB5b3VyIGdvYWwsIHlvdSBjYW4gZ2V0IHRoZXJlIGlmIHlvdSdyZSB3aWxsaW5nIHRvIHdvcmsuIFx0T3ByYWggV2luZnJleVxuIn19',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJZb3UgbmV2ZXIga25vdyBob3cgc3Ryb25nIHlvdSBhcmUgdW50aWwgYmVpbmcgc3Ryb25nIGlzIHRoZSBvbmx5IGNob2ljZSB5b3UgaGF2ZS5cdENheWxhIE1pbGxzXG4ifX0%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJZb3UgY2FuJ3QgYmUgYSBwb3NpdGl2ZSBsZWFkZXIgaWYgeW91J3JlIGEgbmVnYXRpdmUgdGhpbmtlci5cdEpveWNlIE1leWVyXG4ifX0%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJcIkEgc2lsZW50LCBrbm93aW5nIHNtaWxlIGlzIHRoZSBtb3N0IGVsb3F1ZW50IG9mIGFsbCBmb3JtcyBvZiBjb21tdW5pY2F0aW9uLlwiIE5lbGwgTWNDYWZmZXJ0eSAifX0%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJcIkkgYmVsaWV2ZSB0aGUgZnV0dXJlIGlzIG9ubHkgdGhlIHBhc3QgYWdhaW4sIGVudGVyZWQgdGhyb3VnaCBhbm90aGVyIGdhdGUuXCIgTWF1ZCBHb25uZSJ9fQ%253D%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJcIkknbSBub3QgYm9zc3k7IEknbSB0aGUgYm9zcy5cIiBTaW5lYWQgTydDb25ub3IifX0%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJcIkl0IGlzIGluIHRoZSBzaGVsdGVyIG9mIGVhY2ggb3RoZXIgdGhhdCB0aGUgcGVvcGxlIGxpdmUuXCIgTWFyeSBNY0FsZWVzZSJ9fQ%253D%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJcIkl0IGlzIHBlcmhhcHMgYSBncmVhdGVyIGpveSB0byBjbGltYiB0byB0aGUgaGVpZ2h0cyBvZiB5b3VyIG93biBzcGlyaXQgYW5kIHJlYWNoIGZvciB0aGUgc3RhcnMgdGhhbiB0byBzdGFuZCBpZGx5IG9uIHRoZSBlYXJ0aC5cIiBNYXVkIEdvbm5lIn19',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJcIkVxdWFsaXR5IGlzIGFib3V0IHRyZWF0aW5nIGV2ZXJ5b25lIGluIGV4YWN0bHkgdGhlIHNhbWUgd2F5LiBCdXQgaWYgeW91IHRyZWF0IGV2ZXJ5b25lIGluIGV4YWN0bHkgdGhlIHNhbWUgd2F5LCBpdCB3aWxsIG5vdCBpbiBmYWN0IGRlbGl2ZXIgZXF1YWxpdHksIGJlY2F1c2UgZGlmZmVyZW50IHBlb3BsZSBuZWVkIGRpZmZlcmVudCB0aGluZ3MuXCIgTWFyeSBNY0FsZWVzZSJ9fQ%253D%253D',
      '?utm_source=beta_app&utm_medium=a&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjgwNSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJcIlRoZSBtb3N0IGltcG9ydGFudCB0aGluZyBpcyB0byBiZSB5b3Vyc2VsZiwgdG8gYmUgdHJ1ZSB0byB5b3Vyc2VsZiBhbmQgdG8gbGlzdGVuIGFzIG11Y2ggYXMgb25lIGlzIGFibGUgdG8gb3RoZXJzIHdob3NlIHZpZXdzIHlvdSByZXNwZWN0IGFuZCBhZG1pcmUuXCIgIE1hcnkgUm9iaW5zb24ifX0%253D',
    ]
    const randomizedCipher = puzzles.map((puzzle) => {
      const queryParams = new URLSearchParams(puzzle)
      const gameFromQueryParams = loadGameStateFromQueryParam(queryParams)
      return shareGameToQueryParams({
        seed: Math.floor(Math.random() * 100),
        message: gameFromQueryParams.solution.quote,
      })
    })
    console.log('randomizedCipher', randomizedCipher.join('\n'))
    expect('randomizedCipher').toHaveLength(16)
  })
})
