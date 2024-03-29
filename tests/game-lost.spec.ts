import { expect, test } from '@playwright/test'

import { collectConsole } from './utils'

test.describe('game lost', () => {
  test.beforeEach(({ page }, testInfo) => {
    collectConsole({ page }, testInfo)
  })
  test('As a user I want know how many guesses i have left', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })

    await page.goto(
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ'
    )
    await page.locator('.absolute').click()

    await page.getByRole('button', { name: 'N' }).first().click()
    // 5 wrong guesses
    await page.keyboard.type('a')
    await page.keyboard.type('b')
    await page.keyboard.type('c')
    await page.keyboard.type('d')
    await page.keyboard.type('e')

    // 4 wrong guesses (2 present)
    await page.keyboard.type('f')
    await page.keyboard.type('g')
    await page.keyboard.type('j')
    await page.keyboard.type('k')

    // Let the UI settle
    await page.waitForTimeout(1000)

    expect(await page.getByLabel('There is an message')).toHaveText(
      'You have used 9 guesses - you have 1 left.'
    )
  })

  test('As a user I want the challenge of guessing the puzzle within x guesses', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })

    await page.goto(
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ'
    )
    await page.locator('.absolute').click()

    await page.getByRole('button', { name: 'N' }).first().click()
    // 5 wrong guesses
    await page.keyboard.type('a')
    await page.keyboard.type('b')
    await page.keyboard.type('c')
    await page.keyboard.type('d')
    await page.keyboard.type('e')

    // 5 wrong guesses (2 present)
    await page.keyboard.type('f')
    await page.keyboard.type('g')
    await page.keyboard.type('j')
    await page.keyboard.type('k')
    await page.keyboard.type('l')

    // Let the UI settle
    await page.waitForTimeout(1000)

    // Make the 11th guess
    await page.keyboard.type('k')

    // Let the UI settle
    await page.waitForTimeout(100)

    expect(await page.getByLabel('There is an message')).toHaveText(
      'The quote was hi'
    )

    expect(
      await page.getByRole('heading', { name: 'Statistics' })
    ).toBeVisible()

    await page.screenshot({ path: `game-lost-${Date.now()}.png` })
    await page.locator('.absolute').click()
  })
})
