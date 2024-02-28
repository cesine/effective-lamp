import { solution } from '../../lib/words'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(solution.length))

  const onClick = (input: string, ariaLabel: string) => {
    alert(`You clicked on ${ariaLabel}`)
  }

  return (
    <div className="mb-1 flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell onClick={onClick} encryptedValue="" decryptedValue="" key={i} />
      ))}
    </div>
  )
}
