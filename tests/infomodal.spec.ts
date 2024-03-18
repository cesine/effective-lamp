import { test, expect } from '@playwright/test';
test.describe('cryptogram tests', () => {

test('Should open the Info Modal', async ({ page }) => {
  await page.goto('https://www.isabelleclueright.com/cryptogram/?utm_source=supersolvers&utm_medium=email&utm_campaign=beta_1&utm_id=beta_one');
  await page.locator('.absolute').click();
  await page.getByLabel('Open Info Modal').click();
  await page.locator('.absolute').click();
});
})