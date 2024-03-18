import { test, expect } from '@playwright/test';
test.describe('cryptogram tests', () => {

test('should open the message modal and be able to type in a new message.', async ({ page }) => {
  await page.goto('https://www.isabelleclueright.com/cryptogram/?utm_source=supersolvers&utm_medium=email&utm_campaign=beta_1&utm_id=beta_one');
  await page.locator('.absolute').click();
  await page.getByLabel('Encrypt your message').getByRole('button').click();
  
});

test('should be able to open an archived game after making a message.', async ({ page }) => {
  await page.goto('https://www.isabelleclueright.com/cryptogram/?utm_source=supersolvers&utm_medium=email&utm_campaign=beta_1&utm_id=beta_one');
  await page.locator('.absolute').click();
  await page.getByLabel('Encrypt your message').getByRole('button').click();
  await page3.getByLabel('Open Archived Games').click();
  await page3.getByLabel('Choose Tuesday, March 5th,').click();
  await page3.getByRole('button', { name: 'Choose 5 Mar' }).click();
});
})