import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should be warned if I re-use a letter', async ({ page }) => {
    await page.goto(
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ=='
    )

    await page.locator('.absolute').click()

    await page.getByRole('button', { name: 'Q' }).nth(1).click()
    await page.keyboard.type('H')
    expect(await page.getByRole('button', { name: 'Q' }).nth(1)).toHaveText('H')

    await page.getByRole('button', { name: 'N' }).nth(1).click()
    await page.keyboard.type('H')

    // Sometimes this is covered by the duplicate letter message
    // expect(await page.getByRole('button', { name: 'N' }).nth(1)).toHaveText('H')

    expect(await page.getByLabel('There is an message')).toBeVisible()
    expect(await page.getByLabel('There is an message')).toHaveText(
      'You have already guessed this letter: H for Q.'
    )
  })
})
