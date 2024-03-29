import { expect, test } from '@playwright/test'

import { collectConsole } from './utils'

test.describe('undo tests', () => {
  test.beforeEach(({ page }, testInfo) => {
    collectConsole({ page }, testInfo)
  })
  test('As a user I want to delete a guess by pushing backspace', async ({
    page,
  }) => {
    await page.goto('/?beta=true')
    await page.locator('.absolute').click()

    await page.getByRole('button').nth(2).click()
    await page.keyboard.type('t')
    expect(await page.getByRole('button').nth(2)).toHaveText('T')

    await page.getByRole('button').nth(3).click()
    await page.keyboard.type('h')
    expect(await page.getByRole('button').nth(3)).toHaveText('H')

    // Add a couple guesses
    await page.getByRole('button').nth(3).click()
    await page.keyboard.type('E')
    expect(await page.getByRole('button').nth(3)).toHaveText('E')
    await page.keyboard.type('P')
    expect(await page.getByRole('button').nth(3)).toHaveText('P')

    // Undo the guesses
    await page.keyboard.press('Backspace')
    expect(await page.getByRole('button').nth(3)).toHaveText('')
    await page.keyboard.press('Backspace')
    expect(await page.getByRole('button').nth(3)).toHaveText('')
  })

  test('As a user I want to undo a guess by clicking on a cell', async ({
    page,
  }) => {
    await page.goto('/?beta=true')
    await page.locator('.absolute').click()

    await page.getByRole('button').nth(2).click()
    await page.keyboard.type('t')
    expect(await page.getByRole('button').nth(2)).toHaveText('T')

    await page.getByRole('button').nth(3).click()
    await page.keyboard.type('h')
    expect(await page.getByRole('button').nth(3)).toHaveText('H')

    await page.getByRole('button').nth(3).click()
    await page.keyboard.type('E')

    await page.getByRole('button').nth(3).click()
    await page.keyboard.press('Backspace')
    expect(await page.getByRole('button').nth(3)).toHaveText('')

    await page.getByRole('button').nth(2).click()
    await page.keyboard.press('Backspace')
    expect(await page.getByRole('button').nth(2)).toHaveText('')
  })
})
