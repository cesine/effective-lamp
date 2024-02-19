import { encodePhrase, newCipher } from './cipher'

describe('cipher', () => {
  describe('newCipher', () => {
    it('should return a cipher of length 26', () => {
      const cipher = newCipher()
      expect(cipher.length).toBe(26)
    })

    it('should return a cipher with unique values', () => {
      const cipher = newCipher()
      const values = cipher.map((item) => {
        return item.value
      })
      const uniqueValues: string[] = values
        .filter((value) => value !== undefined) // Filter out undefined values
        .map((value) => value as string) // Cast the values to string
      expect(values.length).toBe(uniqueValues.length)
    })
  })

  describe('encodePhrase', () => {
    it('should encode the phrase ', () => {
      const phrase = 'Break a leg'
      const cipher = newCipher()
      const encodedPhrase = encodePhrase({ cypher: cipher, phrase })
      expect(encodedPhrase).not.toBe(phrase)
      expect(encodedPhrase.length).toEqual(phrase.length)
      expect(encodedPhrase[5]).toEqual(' ')
    })
  })
})
