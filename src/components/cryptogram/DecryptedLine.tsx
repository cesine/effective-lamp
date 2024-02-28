import { solution, unicodeSplit } from '../../lib/quotes'
import { Cell } from './Cell'

type Props = {
  guess: string
  className: string
}
const onClick = (input: string, ariaLabel: string) => {
  alert(`You clicked on ${ariaLabel}`)
}

export const DecryptedLine = ({ guess, className }: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(solution.length - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell
          onClick={onClick}
          key={i}
          encryptedValue={guess}
          decryptedValue={letter}
        />
      ))}
      {emptyCells.map((_, i) => (
        <Cell onClick={onClick} encryptedValue="" key={i} />
      ))}
    </div>
  )
}
