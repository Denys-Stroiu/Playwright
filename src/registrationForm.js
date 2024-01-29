import { expect } from '@playwright/test';

export class RegistrationForm {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
  }

  async enterUserName(value) {
    await this.page.locator('#signupName').fill(value);
  }

  async enterUsersignupLastName(value) {
    await this.page.locator('#signupLastName').fill(value);
  }

  async enterUsersEmail(value) {
    await this.page.getByLabel('Name').fill(value);
  }

  async enterUsersPassword(value) {
    await this.page.getByRole('textbox', { name: 'Password', exact: true }).fill(value);
  }

  async enterUsersRePassword(value) {
    await this.page.locator('[name = "repeatPassword"]').fill(value);
  }

  async clickOnRegistrationButton() {
    await this.page.getByRole('button', { name: 'Register' }).click();
  }

  async pressTabButton() {
    await this.page.keyboard.press('Tab');
  }

  async assertErrorMessage(value) {
    await expect(this.page.locator('.invalid-feedback').first()).toHaveText(value)
  }

  async assertButton() {
    await expect(this.page.getByRole('button', { name: 'Register' })).toBeDisabled()
  }
};