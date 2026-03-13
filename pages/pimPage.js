export class PimPage {
  constructor(page) {
    this.page = page;
    // Locator lấy từ code Codegen của bạn
    this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' }).first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.tableHeader = page.locator('.oxd-table-header');
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
  }

  async searchEmployee(name) {
    await this.employeeNameInput.fill(name);
    await this.searchButton.click();
  }
}