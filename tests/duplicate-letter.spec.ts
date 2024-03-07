import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should be warned if I re-use a letter', async ({ page }) => {
    await page.goto(
      '/?code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ=='
    )

    await page.getByLabel('How to play').getByRole('button').click()

    await page.getByRole('button', { name: 'R' }).click()
    await page.keyboard.type('H')
    expect(await page.getByRole('button', { name: 'R' })).toHaveText('H')

    await page.getByRole('button', { name: 'S' }).click()
    await page.keyboard.type('H')
    expect(await page.getByRole('button', { name: 'S' })).toHaveText('H')

    expect(await page.getByLabel('There is an message')).toBeVisible()
    expect(await page.getByLabel('There is an message')).toHaveText(
      'You have already guessed this letter: H for R.'
    )
  })
})
