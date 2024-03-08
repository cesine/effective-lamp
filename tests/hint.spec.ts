import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should be able to get several hints', async ({ page }) => {
    await page.goto('/?beta=true')
    await page.getByLabel('How to play').getByRole('button').click()

    // Switch to easy mode
    // await page.getByLabel('Open Settings').click()
    // await page.getByLabel('Hard Mode').click()
    // await page
    //   .getByLabel('Settings', { exact: true })
    //   .getByRole('button')
    //   .click()

    await page.getByLabel('Show Hint').click()
    await page.getByLabel('Show Hint').click()
    await page.getByLabel('Show Hint').click()
    await page.getByLabel('Show Hint').click()
    await page.getByLabel('Show Hint').click()
    await page.getByLabel('Show Hint').click()
    await page.getByLabel('Show Hint').click()
    await page.getByLabel('Show Hint').click()
    await page.getByLabel('Show Hint').click()
    await page.getByLabel('Show Hint').click()
    await page.getByLabel('Show Hint').click()
    expect(await page.getByLabel('There is an message')).toBeVisible()
    expect(await page.getByLabel('There is an message')).toHaveText(
      'No more hints available.'
    )
  })
})
