import { encodePhrase, newCipher } from './cipher'

describe('cipher', () => {
  describe('newCipher', () => {
    it('should return a cipher of length 26', () => {
      const cipher = newCipher(3)
      expect(Object.keys(cipher).length).toBe(26)
    })

    it('should return a cipher with unique values', () => {
      const cipher = newCipher(3)
      const values = Object.keys(cipher).map((key) => {
        return cipher[key].decrypted
      })
      const uniqueValues: string[] = values
        .filter((value: string) => value !== undefined) // Filter out undefined values
        .map((value: string) => value as string) // Cast the values to string
      expect(values.length).toBe(uniqueValues.length)
    })

    it('should use the same cipher for the same seed', () => {
      const cipher = newCipher(8)
      expect(cipher['A'].decrypted).toEqual('R')
    })

    it('should not use the same cipher for a different seed', () => {
      const cipher = newCipher(760)
      expect(cipher['A'].decrypted).not.toEqual('Z')
    })

    it('should not use the same cipher for the next seed', () => {
      const cipher = newCipher(761)
      expect(cipher['A'].decrypted).not.toEqual('Z')
    })

    it('should not use the same cipher for seed which end in 8', () => {
      const cipher = newCipher(768)
      expect(cipher['A'].decrypted).not.toEqual('Z')
    })

    it('shuffled letter should not match original letter', () => {
      const cipher = newCipher(3)
      Object.keys(cipher).map((key: string) => {
        if (key === cipher[key].decrypted) {
          expect(cipher[key].decrypted).not.toEqual(key)
        }
      })
    })
  })

  describe('encodePhrase', () => {
    it('should encode the phrase ', () => {
      const phrase = 'Break a leg'
      const cipher = newCipher(3)
      const encodedPhrase = encodePhrase({ cipher: cipher, phrase })
      expect(encodedPhrase).not.toBe(phrase)
      expect(encodedPhrase.length).toEqual(phrase.length)
      expect(encodedPhrase[5]).toEqual(' ')
    })
  })
})
