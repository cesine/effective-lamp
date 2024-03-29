import { expect, test } from '@playwright/test'

import { collectConsole } from './utils'

const { BASE_URL = 'http://127.0.0.1:3000' } = process.env
test.describe('cryptogram tests', () => {
  test.beforeEach(({ page }, testInfo) => {
    collectConsole({ page }, testInfo)
  })
  test('should open the message modal and be able to type in a new message.', async ({
    page,
  }) => {
    await page.goto(
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ'
    )
    expect(
      await page.getByRole('heading', { name: 'How to play' })
    ).toBeVisible()
    await page.locator('.absolute').click()

    await page.getByLabel('Send an encrypted message').click()
    await page.locator('#share-message').click()
    await page.keyboard.type('to be or not to be')
    await page.getByRole('button', { name: 'Share' }).click()
    expect(await page.getByLabel('Share this link to preview')).toHaveAttribute(
      'href',
      `${BASE_URL}/?utm_source=beta_app&utm_medium=share_button&utm_campaign=encrypted_message&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJ0byBiZSBvciBub3QgdG8gYmUifX0%253D`
    )
  })

  test('should be able to open an archived game after making a message.', async ({
    page,
  }) => {
    await page.goto(
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ'
    )
    expect(
      await page.getByRole('heading', { name: 'How to play' })
    ).toBeVisible()
    await page.locator('.absolute').click()

    await page.waitForTimeout(1000)

    const expectedCountOfButtons = 2
    expect(await page.locator('button').count()).toEqual(expectedCountOfButtons)

    await page.getByLabel('Open Archived Games').click()
    await page.getByRole('button', { name: 'Choose today' }).click()

    // The puzzle should change to today's puzzle
    expect(await page.locator('button').count()).not.toEqual(
      expectedCountOfButtons
    )
    // It should be a longer (more realistic) puzzle
    expect(await page.locator('button').count()).toBeGreaterThan(10)
    expect(await page.url()).not.toContain(
      `code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ`
    )
  })
})
