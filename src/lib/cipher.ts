const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const keys = [...alphabet]

type Cypher = Array<{ key: string; value: string }>

export const newCipher = () => {
  const values = alphabet.sort(() => (Math.random() > 0.5 ? 1 : -1))

  let cipher: Cypher = []
  for (let index in keys) {
    cipher = [...cipher, { key: keys[index], value: values[index] }]
  }

  return cipher
}

export const encodePhrase = ({
  cypher,
  phrase,
}: {
  cypher: Cypher
  phrase: string
}) => {
  const encoded = phrase.toLocaleUpperCase().split('')
  for (let index in encoded) {
    const letter = encoded[index]
    const encodedLetter =
      cypher.find(({ key }) => key === letter)?.value || letter
    encoded[index] = encodedLetter
  }
  return encoded.join('')
}
