import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should be able to share and transfer stats', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('How to play').getByRole('button').click()

    // await page
    //   .locator('div')
    //   .filter({ hasText: /^""T$/ })
    //   .getByLabel('T')
    //   .first()
    //   .click()
    // await page.keyboard.type('a')
    // expect(
    //   page
    //     .locator('div')
    //     .filter({ hasText: /^""AT$/ })
    //     .getByLabel('T')
    //     .first()
    // ).toHaveText('A')

    await page.getByRole('button', { name: 'F' }).click()
    await page.keyboard.type('o')
    expect(page.getByRole('button', { name: 'F' })).toHaveText('O')

    /*
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

    */

    await page.getByLabel('Open Stats').click()
    await page.getByRole('button', { name: 'Transfer' }).click()
    await page.getByRole('button', { name: 'Copy' }).click()
    let shareFromIconClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(shareFromIconClipboardText).toContain('P/')
    await page
      .getByLabel('Transfer your statistics')
      .getByRole('button')
      .first()
      .click()

    await page.getByLabel('Open Settings').click()
    await page.getByLabel('Dark Mode').click()
    await page
      .getByLabel('Settings', { exact: true })
      .getByRole('button')
      .click()
  })
})
