import { test, expect } from '@playwright/test';
import WelcomePage from '../src/pages/WelcomePage';
import GaragePage from '../src/pages/GaragePage'

test.describe('Test spec', async () => {
  test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

  test('valid test', async ({ page }) => {
    const welcomePage = new WelcomePage(page);
    const garage = new GaragePage(page)

		const loginForm = await welcomePage.openLoginForm();
    const registerForm = await welcomePage.getRegisterForm()

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

    // await garage.navigate()
    await garage.settingsMenu.click()
    await garage.removeMyAccountBtn.click()
    await garage.removeBtn.click()

    await page.close()
  });

  test('name shold containt more that 2 characters', async({ page }) => {
    const welcomePage = new WelcomePage(page);
		const loginForm = await welcomePage.openLoginForm();
    const registerForm = await welcomePage.getRegisterForm()

    await loginForm.registerUserBtn.click()

		await registerForm.nameInput.fill('T')
    await registerForm.nameInput.blur();

    await expect(registerForm.errorMsg).toHaveText('Name has to be from 2 to 20 characters long');

  
    await page.close()
  })

  test('last name shold containt more that 2 characters', async({ page }) => {
    const welcomePage = new WelcomePage(page);
		const loginForm = await welcomePage.openLoginForm();
    const registerForm = await welcomePage.getRegisterForm()

    await loginForm.registerUserBtn.click()

		await registerForm.lastNameInput.fill('R')
    await registerForm.lastNameInput.blur();

    await expect(registerForm.errorMsg).toHaveText('Last name has to be from 2 to 20 characters long');

    await page.close()
  })

  test('user can register only with valid email', async({ page }) => {
    const welcomePage = new WelcomePage(page);
		const loginForm = await welcomePage.openLoginForm();
    const registerForm = await welcomePage.getRegisterForm()

    await loginForm.registerUserBtn.click()

		await registerForm.emailInput.fill('aqa-tomRid3')
    await registerForm.emailInput.blur();

    await expect(registerForm.errorMsg).toHaveText('Email is incorrect');

    await page.close()
  })
});