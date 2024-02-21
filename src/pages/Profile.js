import BasePage from "./BasePage"

export default class Profile extends BasePage {
	constructor(page) {
		super(page, "/panel/profile")
		this.profileMenu = this._page.getByText('Profile').last()
		this.profileName = this._page.locator('.panel-page_content .profile_name')
	}
}
