export default class BasePage {
	constructor(page, url, waitPageSlector = 'html') {
		this._page = page;
		this._url = url;
		this._waitPageLocator = this._page.locator(waitPageSlector);
	}

	async navigate() {
		await this._page.goto(this._url);
		await this._waitPageLocator.waitFor({ state: 'visible' });
	}
}
