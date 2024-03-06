import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should send game events to google analytics', async ({ page }) => {
    const path =
      '/?code=eyJndWVzc2VzIjpbXSwiaW5kZXgiOjc5NCwibWVzc2FnZSI6IkFuIGVuY3J5cHRlZCBtZXNzYWdlIiwic29sdXRpb24iOiJoaSJ9'

    await page.goto(path)
    page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`)
      dialog.dismiss().catch(() => {})
    })
    await page.getByLabel('How to play').getByText('P', { exact: true }).click()
    await page.getByLabel('How to play').getByRole('button').click()

    await page.getByLabel('Open Info Modal').click()
    await page.getByLabel('How to play').getByRole('button').click()

    await page.getByLabel('Send an encrypted message').click()
    await page.locator('#share-message').click()
    await page.locator('#share-message').fill('hi')
    page.on('dialog', async (dialog) => {
      console.log(dialog.message())
      await dialog.accept()
    })
    await page.getByRole('button', { name: 'Save' }).click()

    await page.getByRole('button', { name: 'R' }).click()
    await page.keyboard.type('o')
    expect(page.getByRole('button', { name: 'R' })).toHaveText('O')

    await page.getByRole('button', { name: 'R' }).click()
    await page.keyboard.type('i')
    expect(page.getByRole('button', { name: 'R' })).toHaveText('I')

    await page.getByRole('button', { name: 'S' }).click()
    await page.keyboard.type('h')
    expect(page.getByRole('button', { name: 'S' })).toHaveText('H')

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

    expect(events).toEqual(['gtm.dom', 'gtm.scrollDepth', 'gtm.load'])

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

    expect(gameEvents).toEqual([
      'unlock_achievement: open_shared_encrypted_message',
      'level_start: Cryptogram 794 hi',
      'sign_up: Anonymous',
      'login: Anonymous',
      'unlock_achievement: click_alphabet_letter',
      'unlock_achievement: make_incorrect_guess',
      'unlock_achievement: make_correct_guess',
      'level_up: 1',
      'post_score: 1',
      'level_end: Cryptogram 794 hi',
      'share: Navigator Clipboard API',
      'unlock_achievement: click_transfer_stats',
      'unlock_achievement: exported_stats',
      'unlock_achievement: open_settings',
      'unlock_achievement: choose_dark_mode',
      'unlock_achievement: choose_high_contrast',
    ])
  })
})
