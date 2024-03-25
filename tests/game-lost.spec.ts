import { expect, test } from '@playwright/test'

import { collectConsole } from './utils'

test.describe('game lost', () => {
  test.beforeEach(({ page }, testInfo) => {
    collectConsole({ page }, testInfo)
  })
  test('As a user I want know how many guesses i have left', async ({
    page,
  }) => {
    await page.goto(
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ'
    )
    await page.locator('.absolute').click()

    await page.getByRole('button', { name: 'A' }).first().click()
    await page.keyboard.type('a')
    await page.keyboard.type('b')
    await page.keyboard.type('c')
    await page.keyboard.type('d')
    await page.keyboard.type('e')
    await page.keyboard.type('f')
    await page.keyboard.type('g')
    await page.keyboard.type('j')
    await page.keyboard.type('k')
    await page.keyboard.type('l')
    await page.keyboard.type('m')
    expect(await page.getByLabel('There is an message')).toHaveText(
      'You have used 9 guesses - you have 1 left.'
    )
  })

  test('As a user I want the challenge of guessing the puzzle within x guesses', async ({
    page,
  }) => {
    await page.goto(
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ'
    )
    await page.locator('.absolute').click()

    await page.getByRole('button', { name: 'A' }).first().click()
    await page.keyboard.type('a')
    await page.keyboard.type('b')
    await page.keyboard.type('c')
    await page.keyboard.type('d')
    await page.keyboard.type('e')
    await page.keyboard.type('f')
    await page.keyboard.type('g')
    await page.keyboard.type('j')
    await page.keyboard.type('k')
    await page.keyboard.type('l')
    await page.keyboard.type('m')
    await page.keyboard.type('n')
    await page.keyboard.type('o')
    await page.keyboard.type('p')
    await page.keyboard.type('q')
    await page.keyboard.type('r')
    await page.keyboard.type('s')
    expect(
      await page.getByRole('heading', { name: 'Statistics' })
    ).toBeVisible()

    await page.screenshot({ path: `game-lost-${Date.now()}.png` })
    expect(await page.getByLabel('There is an message')).toHaveText(
      'The quote was hi'
    )
    await page.locator('.absolute').click()
  })
})
