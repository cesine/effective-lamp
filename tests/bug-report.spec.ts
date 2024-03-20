import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should open up the bug report form', async ({ page }) => {
    await page.goto(
      'https://www.isabelleclueright.com/cryptogram/?utm_source=supersolvers&utm_medium=email&utm_campaign=beta_1&utm_id=beta_one'
    )
    await page.locator('.absolute').click()
  })
})
