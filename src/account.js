import { expect } from '@playwright/test';

export class Account {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
  }

  async openMenu(menuText = 'Settings') {
    await this.page.getByText(menuText).last().click()
  }

  async removeAccount() {
    await this.openMenu()
    await this.page.getByText('Remove my account').click()
    await this.page.getByText('Remove').last().click()
  }

  async assertAccountMenu() {
    await expect(this.page.locator('#userNavDropdown')).toBeVisible();
  }
};