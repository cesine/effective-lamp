import { expect, test } from '@playwright/test'

import { collectConsole } from './utils'

test.describe('undo tests', () => {
  test.beforeEach(({ page }, testInfo) => {
    collectConsole({ page }, testInfo)
  })
  test('As a user I want to undo a guess by clicking on a cell', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByLabel('How to play').getByRole('button').click()

    await page.getByRole('button', { name: 'A' }).click()
    await page.keyboard.type('t')
    expect(page.getByRole('button', { name: 'A' })).toHaveText('T')

    await page.getByRole('button', { name: 'B' }).click()
    await page.keyboard.type('h')
    expect(page.getByRole('button', { name: 'B' })).toHaveText('H')

    // Add a couple guesses
    await page.getByRole('button', { name: 'C' }).click()
    await page.keyboard.type('E')
    expect(page.getByRole('button', { name: 'C' })).toHaveText('E')
    await page.keyboard.type('P')
    expect(page.getByRole('button', { name: 'C' })).toHaveText('P')

    // Undo the guesses
    await page.keyboard.press('Backspace')
    expect(page.getByRole('button', { name: 'C' })).toHaveText('E')
    await page.keyboard.press('Backspace')
    expect(page.getByRole('button', { name: 'C' })).toHaveText('')

    await page.getByRole('button', { name: 'B' }).click()
    await page.getByRole('button', { name: 'B' }).click()
    await page.keyboard.press('Backspace')
    expect(page.getByRole('button', { name: 'B' })).toHaveText('')

    await page.getByRole('button', { name: 'A' }).click()
    await page.getByRole('button', { name: 'A' }).click()
    await page.keyboard.press('Backspace')
    expect(page.getByRole('button', { name: 'A' })).toHaveText('')
  })
})
