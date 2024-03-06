import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should be warned if I re-use a letter', async ({ page }) => {
    await page.goto(
      '/?code=eyJzb2x1dGlvbiI6ImhpIiwiZ3Vlc3NlcyI6W10sImluZGV4Ijo0LCJtZXNzYWdlIjoiYSB0b3Agc2VjcmV0IG1lc3NhZ2UgZnJvbSBhIHNoYXJlIn0='
    )

    await page.getByLabel('How to play').getByRole('button').click()

    await page.getByRole('button', { name: 'R' }).click()
    await page.keyboard.type('H')
    expect(await page.getByRole('button', { name: 'R' })).toHaveText('H')

    await page.getByRole('button', { name: 'S' }).click()
    await page.keyboard.type('H')
    expect(await page.getByRole('button', { name: 'S' })).toHaveText('H')

    expect(await page.getByLabel('There is an message')).toBeVisible()
    expect(await page.getByLabel('There is an message')).toHaveText(
      'You have already guessed this letter: H for R.'
    )
  })
})
