const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export type Cipher = {
  [key: string]: {
    decrypted: string
    guesses: string[]
  }
}

function isOriginalPosition(shuffled: string[], original: string[]) {
  for (var i = 0; i < shuffled.length; i++) {
    if (shuffled[i] === original[i]) {
      console.log('this letter is matching', i, original[i])
      return true // Letter is in its original position
    }
  }
  return false // No letters in their original positions
}

export const newCipher = () => {
  let randomKey: string[] = [...ALPHABET].sort(() =>
    Math.random() > 0.5 ? 1 : -1
  )

  while (isOriginalPosition(randomKey, ALPHABET)) {
    console.log('regenerating randomKey', randomKey)
    randomKey = [...ALPHABET].sort(() => (Math.random() > 0.5 ? 1 : -1))
  }

  //const randomKey = [...ALPHABET].sort(() => (Math.random() > 0.5 ? 1 : -1))

  let cipher: Cipher = {}
  for (let index in ALPHABET) {
    // console.log('looking at ', index)
    const i = parseInt(index, 10)
    cipher[randomKey[i]] = {
      decrypted: ALPHABET[i],
      guesses: [],
    }
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
  const encryptedPhrase = phrase.toLocaleUpperCase().split('')
  for (let index in encryptedPhrase) {
    const letter = encryptedPhrase[index]
    const encryptedPhraseLetter =
      Object.keys(cipher).find((key) => cipher[key].decrypted === letter) ||
      letter
    encryptedPhrase[index] = encryptedPhraseLetter
  }
  return encryptedPhrase.join('')
}
