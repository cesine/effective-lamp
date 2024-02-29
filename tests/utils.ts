import type { Page, TestInfo } from '@playwright/test'
import fs from 'fs'

const browserLogFilePath = 'browser.txt'

export const collectConsole = (
  { page }: { page: Page },
  testInfo: TestInfo
) => {
  const [, testPath] = testInfo.file?.match(/\/tests\/(.*)$/) || []

  // Copied from mlt-framework src/browser/browser.js which is not exported anymore
  page.on('console', (msg) => {
    const msgText = msg.text()
    let msgLocation = ''

    if (msg.location) {
      const { url, lineNumber } = msg.location()
      msgLocation = lineNumber ? ` - ${url}:${lineNumber}` : ` - ${url}`
    }

    console.log(
      `${new Date().toISOString()}\t${testPath}\t${msgText}\t${msgLocation}`
    )
    fs.appendFile(
      browserLogFilePath,
      `${new Date().toISOString()}\t${testPath}\t${msgText}\t${msgLocation}\n`,
      (err) => {
        if (err) {
          return console.log(`could not write file ${browserLogFilePath}`, err)
        }
      }
    )
  })
}
