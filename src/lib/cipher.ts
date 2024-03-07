import { CharStatus } from './statuses'

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export type Cipher = {
  [key: string]: {
    decrypted: string
    guesses: string[]
    status?: CharStatus
  }
}

export function generateCryptogramHint(
  key: Cipher,
  encryptedLetters: string[],
  index: number
) {
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  var startIndex = index % alphabet.length

  var availableLetters =
    alphabet.substring(startIndex) + alphabet.substring(0, startIndex)

  // Iterate through the available letters
  for (var i = 0; i < availableLetters.length; i++) {
    var keyLetter = availableLetters.charAt(i)
    // Logger.log(keyLetter);

    // Check if the letter is in the cryptogram
    if (encryptedLetters.includes(keyLetter)) {
      // Find the original letter it corresponds to in the key
      var originalLetter = key[keyLetter].decrypted
      return {
        index,
        keyLetter,
        originalLetter,
      }
    }
  }

  // If no letter was found, return null
  return null
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

function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export const newCipher = (seed: number) => {
  console.log('todays seed', seed)
  let whileCount = 0

  let randomKey: string[] = [...ALPHABET].sort(() =>
    seededRandom(seed) > 0.5 ? 1 : -1
  )

  while (whileCount < 10 && isOriginalPosition(randomKey, ALPHABET)) {
    whileCount++
    console.log('regenerating randomKey', randomKey)
    // eslint-disable-next-line no-loop-func
    randomKey = [...ALPHABET].sort(() =>
      seededRandom(seed + whileCount) > 0.5 ? 1 : -1
    )
    console.log('trying with next seed whileCount', whileCount, seed)
  }

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
  cipher,
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
