export class HeaderMenu {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
  }

  async openRegistrationForm() {
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.page.getByRole('button', { name: 'Registration' }).click();
  }
};