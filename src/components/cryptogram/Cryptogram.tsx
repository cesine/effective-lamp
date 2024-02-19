import { MAX_CHALLENGES } from '../../constants/settings'
import { Letter } from '../alphabet/Letter'
import { DecryptedLine } from './DecryptedLine'
import { EmptyRow } from './EmptyRow'
import { CompletedRow } from './EncryptedRow'

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
      {solution.split('').map(function renderLetter(value) {
        if (/\s/.test(value)) {
          return <div style={{ width: '40px' }}>{value}</div>
        }

        return (
          <Letter
            encryptedValue={null}
            value={value.toLocaleUpperCase()}
            onClick={console.log}
          ></Letter>
        )
      })}
    </div>
  )
}
