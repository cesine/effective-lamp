import { Cipher, getLetters } from '../../lib/cipher'
import { DragAndDropLetter } from './DragAndDropLetter'

type Props = {
  cipher: Cipher
  isHardMode?: boolean
  isHighContrast?: boolean
  isRevealing?: boolean
}

export const Keyboard = ({
  cipher,
  isHardMode = true,
  isHighContrast = false,
  isRevealing,
}: Props) => {
  const remainingLetters = getLetters(cipher)
  let mapping: { [key: string]: string } = {}
  Object.keys(cipher).forEach((key) => {
    mapping[cipher[key].guesses[0] || cipher[key].decrypted] = key
  })
  console.log('made the mapping', mapping)

  return (
    <div className="fixed bottom-0 right-0 flex w-full flex-wrap justify-center bg-white pb-4 pt-2 dark:bg-federal-blue">
      {remainingLetters.map((key) => {
        const encryptedLetter = mapping[key]
        return (
          <DragAndDropLetter
            decryptedLetter={key}
            encryptedLetter={
              cipher[encryptedLetter]?.status ? encryptedLetter : ''
            }
            key={key}
            isRevealing={isRevealing}
            isHighContrast={isHighContrast}
            status={isHardMode ? undefined : cipher[encryptedLetter]?.status}
          />
        )
      })}
    </div>
  )
}
