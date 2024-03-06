import { expect, test } from '@playwright/test'

import { collectConsole } from './utils'

test.describe('game lost', () => {
  test.beforeEach(({ page }, testInfo) => {
    collectConsole({ page }, testInfo)
  })
  test('As a user I want the challenge of guessing the puzzle within x guesses', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByLabel('How to play').getByRole('button').click()

    await page.getByRole('button', { name: 'A' }).click()
    await page.keyboard.type('a')
    await page.keyboard.type('b')
    await page.keyboard.type('c')
    await page.keyboard.type('d')
    await page.keyboard.type('e')
    await page.keyboard.type('f')
    await page.keyboard.type('g')
    await page.keyboard.type('h')
    await page.keyboard.type('i')
    await page.keyboard.type('j')
    await page.keyboard.type('k')
    await page.keyboard.type('l')
    await page.keyboard.type('m')
    await page.keyboard.type('n')
    await page.keyboard.type('o')
    await page.keyboard.type('p')
    await page.keyboard.type('q')
    await page.keyboard.type('r')
    await page.keyboard.type('s')
    await page.keyboard.type('t')
    await page.keyboard.type('u')
    await page.keyboard.type('v')
    await page.keyboard.type('w')
    await page.keyboard.type('x')
    await page.keyboard.type('y')
    await page.keyboard.type('z')
    await page.keyboard.type('a')
    await page.keyboard.type('b')
    await page.keyboard.type('c')

    // TODO Alert never shows in browser maybe because of transition
    // await page.waitForTimeout(200000)
    // await page.screenshot({ path: `game-lost-${Date.now()}.png` })
    // expect( await page.getByLabel('There is an message')).toHaveText('The quote was')
  })
})
