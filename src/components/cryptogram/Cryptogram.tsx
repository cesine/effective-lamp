import { NewLineKind } from 'typescript'

import { MAX_CHALLENGES } from '../../constants/settings'
import { newCipher } from '../../lib/cipher'
import { Cell } from './Cell'
//import { Letter } from '../alphabet/Letter'
import { DecryptedLine } from './DecryptedLine'
import { EmptyRow } from './EmptyRow'
import { CompletedRow } from './EncryptedRow'

const cipher = newCipher()
console.log('cipher is', cipher)

type Props = {
  solution: string

  isRevealing?: boolean
  currentRowClassName: string
}

export const Cryptogram = ({
  solution,

  isRevealing,
  currentRowClassName,
}: Props) => {
  return (
    <div className="mb-1 flex flex-wrap justify-center">
      {solution
        .toLocaleUpperCase()
        .split('')
        .map(function renderLetter(value, i) {
          if (/\s/.test(value)) {
            return (
              <div key={`${i}${value}`} style={{ width: '40px' }}>
                {value}
              </div>
            )
          }

          return <Cell encryptedValue={cipher[value]} value={value}></Cell>
        })}
    </div>
  )
}
