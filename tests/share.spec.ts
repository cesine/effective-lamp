import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should be able to share and transfer stats', async ({ page }) => {
    const path =
      '/?code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ=='
    await page.goto(path)

    await page.getByLabel('How to play').getByRole('button').click()

    await page.getByLabel('Open Settings').click()
    await page.getByLabel('Hard Mode').click()
    await page
      .getByLabel('Settings', { exact: true })
      .getByRole('button')
      .click()

    await page.getByRole('button', { name: 'R' }).click()
    await page.keyboard.type('o')
    expect(await page.getByRole('button', { name: 'R' })).toHaveText('O')

    await page.getByRole('button', { name: 'R' }).click()
    await page.keyboard.type('i')
    expect(await page.getByRole('button', { name: 'R' })).toHaveText('I')

    await page.getByRole('button', { name: 'S' }).click()
    await page.keyboard.type('h')
    expect(await page.getByRole('button', { name: 'S' })).toHaveText('H')

    // Winning dialog should show
    await page.getByRole('button', { name: 'Share' }).click()
    let shareClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(shareClipboardText).toContain("I solved Clueright's Cryptogram")
    expect(shareClipboardText).toContain('An encrypted message 795')
    expect(shareClipboardText).toContain('OIH')
    expect(shareClipboardText).toContain('⬜🟩🟩')
    expect(shareClipboardText).toContain(path)
    const url = await page.url()
    expect(shareClipboardText).toContain(url)

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
    await page.waitForTimeout(3000) // Wait for page to fully load
    await page.getByRole('heading', { name: "Clueright's Cryptogram" }).click()
    await page.waitForSelector('button')
    expect(await page.getByRole('button', { name: 'R' })).toHaveText('I')
    expect(await page.getByRole('button', { name: 'S' })).toHaveText('H')
  })
})
