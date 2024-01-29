import Header from "../components/Header"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import BasePage from "./BasePage"

export default class WelcomePage extends BasePage {
	constructor(page) {
		super(page, "/", ".socials")
		this.header = new Header(this._page)
		this.loginForm = new LoginForm(this._page)
		this.registerForm = new RegisterForm(this._page)
	}

	async openLoginForm() {
		await this.header.signInBtn.click()
		return this.loginForm
	}

	async getRegisterForm() {
		return this.registerForm
	}
}
