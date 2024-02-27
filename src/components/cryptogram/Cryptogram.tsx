import { NewLineKind } from 'typescript'

import { MAX_CHALLENGES } from '../../constants/settings'
import { Cypher, newCipher } from '../../lib/cipher'
import { Cell } from './Cell'

type Props = {
  cipher: Cypher
  solution: string
  isRevealing?: boolean
  currentRowClassName: string
}

export const Cryptogram = ({
  cipher,
  solution,
  isRevealing,
  currentRowClassName,
}: Props) => {
  const words = solution.toLocaleUpperCase().split(/\s/)
  console.log('words are', words)

  function renderLetter(value: string, i: number) {
    if (/\s/.test(value)) {
      return <div test-id="letter">{value}</div>
    }

    return (
      //<span test-id="letter"> {value}</span>
      <Cell encryptedValue={cipher[value] || value} value={value}></Cell>
    )
  }

  function renderWord(word: string) {
    console.log('renderword', word)
    return (
      <div test-id="word" className="mr-4 whitespace-nowrap">
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
