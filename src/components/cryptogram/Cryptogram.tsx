import { NewLineKind } from 'typescript'

import { MAX_CHALLENGES } from '../../constants/settings'
import { Cipher, newCipher } from '../../lib/cipher'
import { Cell } from './Cell'

type Props = {
  onChar: (input: string, ariaLabel: string) => void
  cipher: Cipher
  encryptedQuote: string
  isRevealing?: boolean
  currentRowClassName: string
}

export const Cryptogram = ({
  onChar,
  cipher,
  encryptedQuote: encryptedQuote,
  isRevealing,
  currentRowClassName,
}: Props) => {
  const words = encryptedQuote.toLocaleUpperCase().split(/\s/)
  // console.log('words are', words)

  function renderLetter(value: string, i: number) {
    if (/\s/.test(value)) {
      return (
        <div key={`${value}-${i}`} test-id="letter">
          {value}
        </div>
      )
    }

    return (
      //<span test-id="letter"> {value}</span>
      <Cell
        onClick={onChar}
        key={`${value}-${i}`}
        encryptedValue={value}
        decryptedValue={cipher[value] ? cipher[value].guesses[0] : value}
      ></Cell>
    )
  }

  function renderWord(word: string, i: number) {
    // console.log('renderword', word)
    return (
      <div
        key={`${word}-${i}`}
        test-id="word"
        className="mr-8 flex whitespace-nowrap"
      >
        {word.split('').map(renderLetter)}
      </div>
    )
  }

  const stylePhrase = {
    width: '100%',
  }

  return (
    <div
      test-id="phrase"
      className="mb-1 flex flex-wrap justify-center"
      style={stylePhrase}
    >
      {words.map(renderWord)}
    </div>
  )
}
