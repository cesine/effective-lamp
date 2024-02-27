const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const keys = [...alphabet]

export type Cipher = {
  [key: string]: string
}

export const newCipher = () => {
  const values = alphabet.sort(() => (Math.random() > 0.5 ? 1 : -1))

  let cipher: Cipher = {}
  for (let index in keys) {
    console.log('looking at ', index)
    const i = parseInt(index, 10)
    cipher[keys[i]] = values[i]
  }

  return cipher
}

export const encodePhrase = ({
  cipher: cipher,
  phrase,
}: {
  cipher: Cipher
  phrase: string
}) => {
  const encoded = phrase.toLocaleUpperCase().split('')
  for (let index in encoded) {
    const letter = encoded[index]
    const encodedLetter = cipher[letter] || letter
    encoded[index] = encodedLetter
  }
  return encoded.join('')
}
