import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should open the Info Modal', async ({ page }) => {
    await page.goto('/?beta=true')
    expect(
      await page.getByRole('heading', { name: 'How to play' })
    ).toBeVisible()
    await page.locator('.absolute').click()
    expect(
      await page.getByRole('heading', { name: 'How to play' })
    ).not.toBeVisible()
    await page.getByLabel('Open Info Modal').click()
    expect(
      await page.getByRole('heading', { name: 'How to play' })
    ).toBeVisible()
    await page.locator('.absolute').click()
  })
})
