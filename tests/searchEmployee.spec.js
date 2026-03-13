import { test, expect } from '@playwright/test';
import { PimPage } from '../pages/pimPage';
import data from '../data/testData.json'; 

test.use({
  storageState: 'auth/auth.json'
});

test('TC_02: Tìm kiếm nhân viên thành công - Page Object Model', async ({ page }) => {
  const pimPage = new PimPage(page);

  await pimPage.goto();

  await pimPage.searchEmployee(data.employeeSearch.name);

  await expect(pimPage.tableHeader).toBeVisible({ timeout: 10000 });
});