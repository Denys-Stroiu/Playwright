import BasePage from "./BasePage"

export default class GaragePage extends BasePage {
	constructor(page) {
		super(page, "/panel/settings")
		this.addCarBtn = this._page.getByRole("button", { name: "Add car" })
		this.addCarDataBtn = this._page.getByRole("button", { name: "Add" })
		this.removeMyAccountBtn = this._page.getByText("Remove my account")
		this.removeBtn = this._page.getByText("Remove").last()
		this.settingsMenu = this._page.getByText('Settings').last()
		this.kmField = this._page.locator('#addCarMileage')
	}
}
