import { Guess } from './localStorage'
import { generateEmojiGrid, getEmojiTiles } from './share'

describe('generateEmojiGrid', () => {
  test('generates grid for ascii', () => {
    const guesses = [{ input: 'E' }, { input: 'W' }, { input: 'A' }]
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absent

    const grid = generateEmojiGrid(guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe(guesses.join(''))
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
    expect(gridParts[0]).toBe(guesses.join(''))
  })
  test('generates grid for emoji', () => {
    const guesses = [{ input: '5️⃣4️⃣3️⃣2️⃣1️⃣♠️♥️♦️♣️🔔1️⃣2️⃣3️⃣4️⃣5️⃣' }]
    const tiles = getEmojiTiles(false, false)

    const grid = generateEmojiGrid(guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe(guesses.join(''))
  })
})
