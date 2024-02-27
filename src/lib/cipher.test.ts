import { encodePhrase, newCipher } from './cipher'

describe('cipher', () => {
  describe('newCipher', () => {
    it('should return a cipher of length 26', () => {
      const cipher = newCipher()
      expect(Object.keys(cipher).length).toBe(26)
    })

    it('should return a cipher with unique values', () => {
      const cipher = newCipher()
      const values = Object.keys(cipher).map((key) => {
        return cipher[key].decrypted
      })
      const uniqueValues: string[] = values
        .filter((value: string) => value !== undefined) // Filter out undefined values
        .map((value: string) => value as string) // Cast the values to string
      expect(values.length).toBe(uniqueValues.length)
    })
  })

  describe('encodePhrase', () => {
    it('should encode the phrase ', () => {
      const phrase = 'Break a leg'
      const cipher = newCipher()
      const encodedPhrase = encodePhrase({ cipher: cipher, phrase })
      expect(encodedPhrase).not.toBe(phrase)
      expect(encodedPhrase.length).toEqual(phrase.length)
      expect(encodedPhrase[5]).toEqual(' ')
    })
  })
})
