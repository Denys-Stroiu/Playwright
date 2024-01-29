export class Basic {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page
  }

  async openPage(url) {
    await this.page.goto(url)
  }
};