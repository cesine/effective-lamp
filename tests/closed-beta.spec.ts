import { expect, test } from '@playwright/test'

test.describe('cryptogram tests', () => {
  test('should show a link for how to join the beta', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/')

    // Mobile devices will use an intent instead of a link, so only test the link on desktop
    // Google doesnt like it if you open forms in an automated test
    expect(
      await page.getByRole('link', { name: 'Get my link!' })
    ).toHaveAttribute('href', 'https://forms.gle/FRjSYoG2Js6Pv8QD9')

    expect(await page.getByText('Please use the link provided')).toHaveText(
      'Please use the link provided to you, or click the link below to get beta access.Get my link!'
    )
  })
})
