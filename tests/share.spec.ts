import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should be able to share and transfer stats', async ({ page }) => {
    const params =
      'beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ'
    await page.goto(`/?${params}`)

    await page.locator('.absolute').click()

    await page.getByLabel('Open Settings').click()
    await page.getByLabel('Hard Mode').click()
    await page
      .getByLabel('Settings', { exact: true })
      .getByRole('button')
      .click()

    await page.getByRole('button', { name: 'R' }).nth(1).click()
    await page.keyboard.type('o')
    expect(await page.getByRole('button', { name: 'R' }).nth(1)).toHaveText('O')

    await page.getByRole('button', { name: 'R' }).nth(1).click()
    await page.keyboard.type('i')
    expect(await page.getByRole('button', { name: 'R' }).nth(1)).toHaveText('I')

    await page.getByRole('button', { name: 'S' }).nth(1).click()
    await page.keyboard.type('h')
    expect(await page.getByRole('button', { name: 'S' }).nth(1)).toHaveText('H')

    // Winning dialog should show
    await page.getByRole('button', { name: 'Share' }).click()
    let shareClipboardText = await page.evaluate(
      'navigator.clipboard.readText()'
    )
    expect(shareClipboardText).toContain("I solved Clueright's Cryptogram Beta")
    expect(shareClipboardText).toContain('An encrypted message 795')
    expect(shareClipboardText).toContain('OIH')
    expect(shareClipboardText).toContain('⬜🟩🟩')
    expect(shareClipboardText).toContain(params)
    expect(shareClipboardText).toContain(
      'utm_source=beta_app&utm_medium=share_button&utm_campaign=share'
    )

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
    await page.getByLabel('Statistics').getByRole('button').first().click()
    await page.getByRole('heading', { name: "Clueright's Cryptogram" }).click()
    await page.waitForSelector('button')
    expect(await page.getByRole('button', { name: 'R' }).nth(1)).toHaveText('I')
    expect(await page.getByRole('button', { name: 'S' }).nth(1)).toHaveText('H')
  })
})
