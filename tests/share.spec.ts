import { expect, test } from '@playwright/test'

test.describe('reactle tests', () => {
  test('should be able to share and transfer stats', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('How to play').getByRole('button').click()

    await page.keyboard.type('devote')
    await page.waitForTimeout(100)
    await page.getByLabel('ENTER').click()

    await page.waitForTimeout(100)
    await page.keyboard.type('flame')
    await page.getByLabel('ENTER').click()

    await page.keyboard.type('grist')
    await page.waitForTimeout(100)
    await page.getByLabel('ENTER').click()

    await page.keyboard.type('quirk')
    await page.waitForTimeout(100)
    await page.getByLabel('ENTER').click()

    await page.keyboard.type('brawn')
    await page.waitForTimeout(100)
    await page.getByLabel('ENTER').click()

    await page.keyboard.type('hymns')
    await page.waitForTimeout(100)
    await page.getByLabel('ENTER').click()

    await page.locator('body').press('Enter')

    await page.getByRole('button', { name: 'Share' }).click()
    let shareClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(shareClipboardText).toContain('Reactle')
    expect(shareClipboardText).toContain('⬜')
    expect(shareClipboardText).toContain('🟨')
    expect(shareClipboardText).toContain('🟩')

    await page.getByRole('button', { name: 'Transfer' }).click()
    await page.getByRole('button', { name: 'Copy' }).click()
    let transferClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(transferClipboardText).toContain('P/')

    // Open sharing and transfer using the icon
    await page
      .getByLabel('Transfer your statistics')
      .getByRole('button')
      .first()
      .click()
    await page.locator('svg').nth(1).click()
    await page.getByRole('button', { name: 'Share' }).click()
    let shareFromIconClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(shareFromIconClipboardText).toContain('Reactle')
  })
})
