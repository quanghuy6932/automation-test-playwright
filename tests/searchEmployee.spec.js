import { test, expect } from '@playwright/test';
import { PimPage } from '../pages/pimPage';
import data from '../data/testData.json';

test.use({ storageState: 'auth/auth.json' });

for (const searchItem of data.searchCases) {
  test(`TC_02: Search Employee - ${searchItem.desc}`, async ({ page }) => {
    const pimPage = new PimPage(page);
    await pimPage.goto();
    await pimPage.searchEmployee(searchItem.name);
    
    await page.waitForLoadState('networkidle');

    if (searchItem.name === "Angela" || searchItem.name === "Linda") {

      await expect(page.locator('.oxd-table-card').first()).toBeVisible({ timeout: 10000 });
        await expect(page.locator('.oxd-table-body')).toContainText(searchItem.name);
    } else {

      await expect(page.getByText('No Records Found')).toBeVisible();
    }
  });
}