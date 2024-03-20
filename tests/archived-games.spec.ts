import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should be able to choose an archived game', async ({ page }) => {
    const path =
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ=='
    await page.goto(path)

    await page.locator('.absolute').click()

    await page.getByLabel('Open Archived Games').click()
    // const today = new Date().getDate()

    await page.getByRole('button', { name: 'Choose today' }).click()

    await page.getByRole('button', { name: 'L' }).nth(1).click()
    await page.keyboard.type('o')
    expect(await page.getByRole('button', { name: 'L' }).nth(1)).toHaveText('O')
  })
})
