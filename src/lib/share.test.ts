import { generateEmojiGrid } from './share'

describe('generateEmojiGrid', () => {
  test('generates grid for ascii', () => {
    const guesses = ['E', 'W', 'A']
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absent

    const grid = generateEmojiGrid('ABCDE', guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe(guesses.join(''))
  })
  test('generates grid for emoji', () => {
    const guesses = ['5️⃣4️⃣3️⃣2️⃣1️⃣♠️♥️♦️♣️🔔1️⃣2️⃣3️⃣4️⃣5️⃣']
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absent

    const grid = generateEmojiGrid('1️⃣2️⃣3️⃣4️⃣5️⃣', guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe(guesses.join(''))
  })
})
