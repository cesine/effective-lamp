import { Guess } from './localStorage'
import { generateEmojiGrid, getEmojiTiles } from './share'

describe('generateEmojiGrid', () => {
  test('generates grid for ascii', () => {
    const guesses = [{ input: 'E' }, { input: 'W' }, { input: 'A' }]
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absent

    const grid = generateEmojiGrid(guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe('EWA')
  })
  test('generates grid with status', () => {
    const guesses = [
      { input: 'E', status: 'present' },
      { input: 'W', status: 'correct' },
      { input: 'A', status: 'correct' },
    ]
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absent

    const grid = generateEmojiGrid(guesses as Guess[], tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe('EWA')
  })
  test('generates grid for emoji', () => {
    const guesses: Guess[] = [
      { input: '5️⃣4️⃣3️⃣2️⃣1️⃣♠️♥️♦️♣️🔔1️⃣2️⃣3️⃣4️⃣5️⃣', status: 'present' },
    ]
    const tiles = getEmojiTiles(false, false)

    const grid = generateEmojiGrid(guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe('5️⃣4️⃣3️⃣2️⃣1️⃣♠️♥️♦️♣️🔔1️⃣2️⃣3️⃣4️⃣5️⃣')
    expect(gridParts[1]).toBe('🟨')
  })
})
