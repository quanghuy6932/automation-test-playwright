import { test, expect } from '@playwright/test';
import { RecruitmentPage } from '../pages/recruitmentPage';
import data from '../data/testData.json';

test.use({ storageState: 'auth/auth.json' });

test('TC_03: Thêm mới ứng viên thành công từ dữ liệu JSON', async ({ page }) => {
  const recruitmentPage = new RecruitmentPage(page);

  await recruitmentPage.goto();

  await recruitmentPage.addCandidate(
    data.candidate.firstName,
    data.candidate.middleName,
    data.candidate.lastName,
    data.candidate.email
  );

  await expect(page.getByText('Success', { exact: true })).toBeVisible();
});