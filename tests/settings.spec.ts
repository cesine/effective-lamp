import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should be able to put it in hard mode', async ({ page }) => {
    await page.goto(
      'https://www.isabelleclueright.com/cryptogram/?utm_source=supersolvers&utm_medium=email&utm_campaign=beta_1&utm_id=beta_one'
    )
    await page.locator('.absolute').click()
    await page.getByLabel('Open Settings').click()
    await page.getByLabel('Hard Mode').click()
    await page
      .getByLabel('Settings', { exact: true })
      .getByRole('button')
      .click()
  })

  test('should be able to put it in dark mode', async ({ page }) => {
    await page.goto(
      'https://www.isabelleclueright.com/cryptogram/?utm_source=supersolvers&utm_medium=email&utm_campaign=beta_1&utm_id=beta_one'
    )
    await page.locator('.absolute').click()
    await page.getByLabel('Open Settings').click()
    await page.getByLabel('Dark Mode').click()
    await page
      .getByLabel('Settings', { exact: true })
      .getByRole('button')
      .click()
  })

  test('should be able to put it in high contrast mode', async ({ page }) => {
    await page.goto(
      'https://www.isabelleclueright.com/cryptogram/?utm_source=supersolvers&utm_medium=email&utm_campaign=beta_1&utm_id=beta_one'
    )
    await page.locator('.absolute').click()
    await page.getByLabel('High Contrast Mode').click()
    await page
      .getByLabel('Settings', { exact: true })
      .getByRole('button')
      .click()
  })
})
