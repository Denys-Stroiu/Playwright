import BaseComponent from "./BaseComponent"

export default class RegisterForm extends BaseComponent {
	constructor(page) {
		super(page, "app-signup-modal")
		this.nameInput = this._container.locator("#signupName")
		this.lastNameInput = this._container.locator("#signupLastName")
		this.emailInput = this._container.locator("#signupEmail")
		this.passwordBtn = this._container.getByRole("textbox", {
			name: "Password",
			exact: true,
		})
		this.rePasswordBtn = this._container.locator('[name = "repeatPassword"]')
		this.submitBtn = this._container.getByRole("button", { name: "Register" })
		this.errorMsg = this._container.locator(".invalid-feedback")
	}
}
