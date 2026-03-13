export class RecruitmentPage {
  constructor(page) {
    this.page = page;
    // Lấy từ code Codegen của bạn
    this.addButton = page.getByRole('button', { name: ' Add' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Type here' }).first();
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.successMessage = page.getByText('Success');
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
  }

  async addCandidate(fname, mname, lname, email) {
    await this.addButton.click();
    await this.firstNameInput.fill(fname);
    await this.middleNameInput.fill(mname);
    await this.lastNameInput.fill(lname);
    await this.emailInput.fill(email);
    await this.saveButton.click();
  }
}