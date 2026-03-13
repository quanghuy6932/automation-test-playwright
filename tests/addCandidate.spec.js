import { test, expect } from '@playwright/test';
import { RecruitmentPage } from '../pages/recruitmentPage';
import data from '../data/testData.json';

test.use({ storageState: 'auth/auth.json' });

test.describe('Chức năng Thêm ứng viên - DDT', () => {
  for (const person of data.candidateCases) {
    test(`TC_Add: ${person.desc}`, async ({ page }) => {
      const recruitmentPage = new RecruitmentPage(page);
      await recruitmentPage.goto();
      
      await recruitmentPage.addCandidate(person.fname, person.mname, person.lname, person.email);

      if (person.expected === "success") {

        await expect(page.getByText('Success', { exact: true })).toBeVisible();
      } else if (person.expected === "error_required") {

        await expect(page.locator('span.oxd-input-field-error-message').first()).toHaveText('Required');
      } else if (person.expected === "error_email") {
        
        await expect(page.getByText('Expected format: admin@example.com')).toBeVisible();
      }
    });
  }
});