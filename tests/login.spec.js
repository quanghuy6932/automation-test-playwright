// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import data from '../data/testData.json';

test('TC_01: Đăng nhập thành công với tài khoản Admin', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(data.login.username, data.login.password);

  await expect(page).toHaveURL(/dashboard/);
  
  await page.context().storageState({ path: 'auth/auth.json' });
});