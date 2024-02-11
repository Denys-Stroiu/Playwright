const base = require('@playwright/test');
import WelcomePage from '../pages/WelcomePage';
import GaragePage from '../pages/GaragePage'

exports.test = base.test.extend({
  welcomePageFixture: async ({ page }, use) => {
    await page.goto('/');
    const welcomePage = new WelcomePage(page);
		const loginForm = await welcomePage.openLoginForm();
    const registerForm = await welcomePage.getRegisterForm()
    const garage = new GaragePage(page)

    //Register an account
    await loginForm.registerUserBtn.click()

		await registerForm.nameInput.focus();
		await registerForm.nameInput.fill('Tom')

    await registerForm.lastNameInput.focus();
		await registerForm.lastNameInput.fill('Rid')

    await registerForm.emailInput.focus();
		await registerForm.emailInput.fill('aqa-tomRid3@gmail.com')

    await registerForm.passwordBtn.focus();
		await registerForm.passwordBtn.fill('Qa123456!')

    await registerForm.rePasswordBtn.focus();
		await registerForm.rePasswordBtn.fill('Qa123456!')

    await registerForm.submitBtn.click()

    await use(page);

    //Remove account
    await garage.settingsMenu.click()
    await garage.removeMyAccountBtn.click()
    await garage.removeBtn.click()
    await page.close()
  }
});