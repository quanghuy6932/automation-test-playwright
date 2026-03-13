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
    const firstRow = page.locator('.oxd-table-card').first();
    
    await expect(firstRow).toContainText(searchItem.name, { timeout: 15000 });
} else {
  
    const noRecordMsg = page.locator('span').filter({ hasText: 'No Records Found' }).first();
    await expect(noRecordMsg).toBeVisible({ timeout: 10000 });
}
  });
}