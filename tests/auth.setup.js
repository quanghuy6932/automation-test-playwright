import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import data from '../data/testData.json';

const authFile = 'auth/auth.json';

setup('Đăng nhập và lưu session', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  const validAdmin = data.loginCases.find(c => c.shouldPass === true);

  if (!validAdmin) {
      throw new Error("Không tìm thấy bộ dữ liệu login thành công trong JSON!");
  }

  await loginPage.login(validAdmin.user, validAdmin.pass);
  
  await page.waitForURL(/dashboard/, { timeout: 45000 }); 
  await page.context().storageState({ path: authFile });
});