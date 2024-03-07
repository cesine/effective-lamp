import { expect, test } from '@playwright/test'

import { collectConsole } from './utils'

test.describe('undo tests', () => {
  test.beforeEach(({ page }, testInfo) => {
    collectConsole({ page }, testInfo)
  })
  test('As a user I want to undo a guess by pushing backspace', async ({
    page,
  }) => {
    await page.goto('/?beta=true')
    await page.getByLabel('How to play').getByRole('button').click()

    await page.getByRole('button', { name: 'A' }).click()
    await page.keyboard.type('t')
    expect(await page.getByRole('button', { name: 'A' })).toHaveText('T')

    await page.getByRole('button', { name: 'B' }).click()
    await page.keyboard.type('h')
    expect(await page.getByRole('button', { name: 'B' })).toHaveText('H')

    // Add a couple guesses
    await page.getByRole('button', { name: 'C' }).click()
    await page.keyboard.type('E')
    expect(await page.getByRole('button', { name: 'C' })).toHaveText('E')
    await page.keyboard.type('P')
    expect(await page.getByRole('button', { name: 'C' })).toHaveText('P')

    // Undo the guesses
    await page.keyboard.press('Backspace')
    expect(await page.getByRole('button', { name: 'C' })).toHaveText('E')
    await page.keyboard.press('Backspace')
    expect(await page.getByRole('button', { name: 'C' })).toHaveText('')
  })

  test('As a user I want to undo a guess by clicking on a cell', async ({
    page,
  }) => {
    await page.goto('/?beta=true')
    await page.getByLabel('How to play').getByRole('button').click()

    await page.getByRole('button', { name: 'A' }).click()
    await page.keyboard.type('t')
    expect(await page.getByRole('button', { name: 'A' })).toHaveText('T')

    await page.getByRole('button', { name: 'B' }).click()
    await page.keyboard.type('h')
    expect(await page.getByRole('button', { name: 'B' })).toHaveText('H')

    await page.getByRole('button', { name: 'C' }).click()
    await page.keyboard.type('E')

    await page.getByRole('button', { name: 'B' }).click()
    await page.keyboard.press('Backspace')
    expect(await page.getByRole('button', { name: 'B' })).toHaveText('')

    await page.getByRole('button', { name: 'A' }).click()
    await page.keyboard.press('Backspace')
    expect(await page.getByRole('button', { name: 'A' })).toHaveText('')
  })
})
