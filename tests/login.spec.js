import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import data from '../data/testData.json';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Chức năng Đăng nhập', () => {
  for (const loginCase of data.loginCases) {
    test(`TC_Login: ${loginCase.desc}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await loginPage.goto();

      await loginPage.login(loginCase.user, loginCase.pass);

      if (loginCase.shouldPass) {
        await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
      } else {
        await expect(page.getByText('Invalid credentials')).toBeVisible();
      }
    });
  }
});