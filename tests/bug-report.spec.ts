import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should open up the bug report form', async ({ page }) => {
    await page.goto('/?beta=true')
    await page.locator('.absolute').click()
    expect(await page.getByLabel('Send a bug report')).toHaveAttribute(
      'href',
      'https://forms.gle/zRP8pAE1JrTEA5bWA'
    )
    await page.getByLabel('Send a bug report').click()
  })
})
