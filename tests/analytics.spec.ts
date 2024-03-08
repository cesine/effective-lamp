import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should send game events to google analytics', async ({ page }) => {
    const path =
      '/?beta=true&code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NSwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOnsiYXV0aG9yIjoiIiwicXVvdGUiOiJoaSJ9fQ=='

    await page.goto(path)
    page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`)
      dialog.dismiss().catch(() => {})
    })
    await page.getByLabel('How to play').getByText('P', { exact: true }).click()
    await page.locator('.absolute').click()

    await page.getByLabel('Open Info Modal').click()
    await page.locator('.absolute').click()

    await page.getByLabel('Send an encrypted message').click()
    await page.locator('#share-message').click()
    await page.locator('#share-message').fill('hi')
    await page.getByRole('button', { name: 'Share' }).click()
    await page.locator('.absolute').click()
    // await page.getByLabel('Share this link to preview').click()

    await page.getByRole('button', { name: 'R' }).nth(1).click()
    await page.keyboard.type('o')
    expect(await page.getByRole('button', { name: 'R' }).nth(1)).toHaveText('O')

    await page.getByRole('button', { name: 'R' }).nth(1).click()
    await page.keyboard.type('i')
    expect(await page.getByRole('button', { name: 'R' }).nth(1)).toHaveText('I')

    await page.getByRole('button', { name: 'S' }).nth(1).click()
    await page.keyboard.type('h')
    expect(await page.getByRole('button', { name: 'S' }).nth(1)).toHaveText('H')

    await page.getByRole('button', { name: 'Share' }).click()
    await page.getByRole('button', { name: 'Transfer' }).click()
    await page.getByText('P/adJGUSlg+').click()
    await page.getByRole('button', { name: 'Copy' }).click()

    await page.getByText('new device', { exact: true }).click()
    await page.locator('#immigration-code').click()
    await page.getByText('Paste your migration code:Save').click()
    await page
      .getByLabel('Transfer your statistics')
      .getByRole('button')
      .first()
      .click()

    await page.getByLabel('Open Settings').click()
    await page.getByLabel('Hard Mode').locator('div').click()
    await page.getByLabel('Dark Mode').click()
    await page.getByLabel('High Contrast Mode').click()
    await page
      .getByLabel('Settings', { exact: true })
      .getByRole('button')
      .click()

    //  get window.dataLayer and check events
    await page.waitForTimeout(300)
    const dataLayer = await page.evaluate(() => window.dataLayer)
    // console.log('dataLayer', dataLayer)
    const events = dataLayer
      .filter((e) => !!e.event)
      .map((event) => event.event)

    expect(events).toContain('gtm.scrollDepth')

    const gameEvents = dataLayer
      .filter((e) => e[0] === 'event')
      .map(
        (event) =>
          `${event[1]}: ${
            event[2]?.achievement_id ||
            event[2]?.achievement_id ||
            event[2]?.level_name ||
            event[2]?.level ||
            event[2]?.method
          }`
      )
    console.log('gameEvents', gameEvents)

    expect(gameEvents[1]).toMatch(/level_start: Cryptogram \d+ hi/)
    expect(gameEvents[15]).toMatch(/level_end: Cryptogram \d+ hi/)
    expect(gameEvents).toEqual([
      'unlock_achievement: open_shared_encrypted_message',
      gameEvents[1],
      'sign_up: Anonymous',
      'login: Anonymous',
      'tutorial_begin: undefined',
      'unlock_achievement: click_cryptogram_cell',
      'tutorial_complete: undefined',
      'unlock_achievement: open_info_modal',
      'tutorial_complete: undefined',
      'unlock_achievement: click_send_a_message',
      'unlock_achievement: share_encrypted_message',
      'unlock_achievement: open_shared_encrypted_message',
      'unlock_achievement: click_alphabet_letter',
      'unlock_achievement: make_incorrect_guess',
      'unlock_achievement: make_correct_guess',
      gameEvents[15],
      'level_up: 1',
      'post_score: 1',
      'share: Navigator Clipboard API',
      'unlock_achievement: click_transfer_stats',
      'unlock_achievement: exported_stats',
      'unlock_achievement: open_settings',
      'unlock_achievement: choose_dark_mode',
      'unlock_achievement: choose_high_contrast',
    ])

    const configEvents = dataLayer.filter((e) => e[0] === 'config')
    expect(configEvents[0][2]).toEqual({ debug_mode: true })
  })
})
