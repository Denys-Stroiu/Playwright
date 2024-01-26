import { test, expect } from '@playwright/test';
  
test.describe('Test spec', async () => {
  
  test('valid test', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Registration' }).click();
    await page.locator('#signupName').fill('Tom');
    await page.locator('#signupLastName').fill('Rid');
    await page.getByLabel('Name').fill('aqa-tomRid3@gmail.com');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Qa123456!');
    await page.locator('[name = "repeatPassword"]').fill('Qa123456!');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.locator('#userNavDropdown')).toBeVisible();

    //Remove data
    await page.getByText('Settings').last().click()
    await page.getByText('Remove my account').click()
    await page.getByText('Remove').last().click()

    await page.close()
  });

  test('name shold containt more that 2 characters', async({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Registration' }).click();

    await page.locator('#signupName').fill('Q');
    await page.keyboard.press('Tab');

    await expect(page.locator('.invalid-feedback').first()).toHaveText('Name has to be from 2 to 20 characters long')

    await page.close()
  })

  test('last name shold containt more that 2 characters', async({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Registration' }).click();

    await page.locator('#signupLastName').fill('Q');
    await page.keyboard.press('Tab');

    await expect(page.locator('.invalid-feedback').first()).toHaveText('Last name has to be from 2 to 20 characters long')

    await page.close()
  })

  test('user can register only with valid email', async({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'Registration' }).click();

    await page.locator('#signupName').fill('Name');
    await page.locator('#signupLastName').fill('LastName');
    await page.getByLabel('Name').fill('aqa-tomRid');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('Qa123456!');
    await page.locator('[name = "repeatPassword"]').fill('Qa123456!');

    await expect(page.locator('.invalid-feedback').first()).toHaveText('Email is incorrect')

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()

    await page.close()
  })
});