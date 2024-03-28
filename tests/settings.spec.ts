import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should start in easy mode', async ({ page }) => {
    await page.goto(
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ'
    )
    await page.locator('.absolute').click()

    await page.getByRole('button', { name: 'Q' }).nth(1).click()
    await page.keyboard.type('i')
    expect(await page.getByRole('button', { name: 'Q' }).nth(1)).toHaveText('I')
    expect(await page.locator('.bg-green-700')).toBeVisible()
  })

  test('should be able to put it in hard mode', async ({ page }) => {
    await page.goto(
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ'
    )
    await page.locator('.absolute').click()

    await page.getByLabel('Open Settings').click()
    await page.getByLabel('Hard Mode').click()
    await page.locator('.absolute').click()

    await page.getByRole('button', { name: 'Q' }).nth(1).click()
    await page.keyboard.type('i')
    expect(await page.getByRole('button', { name: 'Q' }).nth(1)).toHaveText('I')
    expect(await page.locator('.bg-green-700')).not.toBeVisible()
  })

  test('should be able to put it in dark mode', async ({ page }) => {
    await page.goto('/?beta=true')
    await page.locator('.absolute').click()

    expect(await page.locator('.dark')).not.toBeVisible()

    await page.getByLabel('Open Settings').click()
    await page.getByLabel('Dark Mode').click()
    await page.locator('.absolute').click()
    expect(await page.locator('.dark')).toBeVisible()
  })

  test('should be able to put it in high contrast mode', async ({ page }) => {
    await page.goto('/?beta=true')
    await page.locator('.absolute').click()

    expect(await page.locator('.high-contrast')).not.toBeVisible()

    await page.getByLabel('Open Settings').click()
    await page.getByLabel('High Contrast Mode').click()
    expect(await page.locator('.high-contrast')).toBeVisible()
  })
})
