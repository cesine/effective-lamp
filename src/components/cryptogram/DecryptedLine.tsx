import { solution, unicodeSplit } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  guess: string
  className: string
}

export const DecryptedLine = ({ guess, className }: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(solution.length - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} encryptedValue={guess} decryptedValue={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell encryptedValue="" key={i} />
      ))}
    </div>
  )
}
