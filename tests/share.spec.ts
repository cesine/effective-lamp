import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should be able to share and transfer stats', async ({ page }) => {
    await page.goto(
      '/?code=eyJzb2x1dGlvbiI6ImhpIiwiZ3Vlc3NlcyI6W10sImluZGV4Ijo0LCJtZXNzYWdlIjoiYSB0b3Agc2VjcmV0IG1lc3NhZ2UgZnJvbSBhIHNoYXJlIn0='
    )

    await page.getByLabel('How to play').getByRole('button').click()

    await page.getByLabel('Open Settings').click()
    await page.getByLabel('Hard Mode').click()
    await page
      .getByLabel('Settings', { exact: true })
      .getByRole('button')
      .click()

    await page.getByRole('button', { name: 'R' }).click()
    await page.keyboard.type('o')
    expect(page.getByRole('button', { name: 'R' })).toHaveText('O')

    await page.getByRole('button', { name: 'R' }).click()
    await page.keyboard.type('i')
    expect(page.getByRole('button', { name: 'R' })).toHaveText('I')

    await page.getByRole('button', { name: 'S' }).click()
    await page.keyboard.type('h')
    expect(page.getByRole('button', { name: 'S' })).toHaveText('H')

    // Winning dialog should show
    await page.getByRole('button', { name: 'Share' }).click()
    let shareClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(shareClipboardText).toContain("Clueright's Cryptogram")
    expect(shareClipboardText).toContain('a top secret message from a share 4')
    expect(shareClipboardText).toContain('OIH')
    expect(shareClipboardText).toContain('⬜🟩🟩')

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

    await page.getByLabel('Open Stats').click()
    await page.getByRole('button', { name: 'Transfer' }).click()
    await page.getByRole('button', { name: 'Copy' }).click()
    let shareFromTransferClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(shareFromTransferClipboardText).toContain('P/')
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

    await page.reload()
    expect(page.getByRole('button', { name: 'R' })).toHaveText('I')
    expect(page.getByRole('button', { name: 'S' })).toHaveText('H')
  })
})
