import BaseComponent from "./BaseComponent"

export default class LoginForm extends BaseComponent {
	constructor(page) {
		super(page, "app-signin-modal")
		this.registerUserBtn = this._container.getByRole("button", {
			name: "Registration",
		})
	}
}
