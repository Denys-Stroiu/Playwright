import { expect } from '@playwright/test';
import WelcomePage from '../src/pages/WelcomePage';
import GaragePage from '../src/pages/GaragePage'
import FuelExpenses from '../src/pages/FuelExpenses'
import { test } from '../src/fixture/pageFixture'

test('If the user doesnt have a car, user sees the next page', async ({ welcomePageFixture, page }) => {
  const fuelExpenses = new FuelExpenses(page)

  await fuelExpenses.fuelExpensesMenu.click()

  await page.waitForTimeout(5000)
  await expect(page).toHaveScreenshot();
  await expect(fuelExpenses.addExpense).toBeDisabled()

  await expect(fuelExpenses.fuelExpensesEmptyItem).toHaveText("You don’t have any cars in your garage")
  await fuelExpenses.fuelExpensesEmptyItemLink.click()
  await page.waitForURL('**/panel/garage');
  await expect(page).toHaveURL('/panel/garage');

  await expect(fuelExpenses.fuelExpensesEmptyItemImage).toHaveAttribute('fill', 'none');
})

test('If the user has the car but no expenses', async ({ welcomePageFixture, page }) => {
  const garage = new GaragePage(page)
  const fuelExpenses = new FuelExpenses(page)

  await garage.addCarBtn.click()
  await garage.kmField.fill('100')

  await page.waitForTimeout(5000)

  await garage.addCarDataBtn.click()
  await page.waitForTimeout(5000)

  await fuelExpenses.fuelExpensesMenu.click()

  await expect(page).toHaveScreenshot();
  await expect(fuelExpenses.addExpense).toBeEnabled()

  await expect(fuelExpenses.fuelExpensesEmptyItem).toHaveText("You don’t have any fuel expenses filed in")
  await fuelExpenses.addExpense.click()

  await expect(fuelExpenses.fuelExpensesModal).toHaveText("Add an expense")
  await fuelExpenses.fuelExpensesModalCloseIcon.click()

  await expect(fuelExpenses.fuelExpensesEmptyItemImage).toHaveAttribute('fill', 'none');
})

test('Fuel expenses table', async ({ welcomePageFixture, page }) => {
  const garage = new GaragePage(page)
  const fuelExpenses = new FuelExpenses(page)

  //Add a car
  await garage.addCarBtn.click()
  await garage.kmField.fill('100')

  await page.waitForTimeout(5000)

  await garage.addCarDataBtn.click()
  await page.waitForTimeout(5000)

  await fuelExpenses.fuelExpensesMenu.click()

  await fuelExpenses.fuelExpensesDropdownListModel.click()
  await expect(fuelExpenses.fuelExpensesDropdownListModelItems).toBeVisible()

  await fuelExpenses.addExpense.click()
  await page.waitForTimeout(1000)
  await fuelExpenses.fuelExpensesModaladdExpenseMileage.fill('500')
  await fuelExpenses.fuelExpensesModaladdExpenseLiters.fill('10')
  await fuelExpenses.fuelExpensesModaladdExpenseTotalCost.fill('10')
  await fuelExpenses.addFuelExpensesDataBtn.click()
 
  await expect(fuelExpenses.fuelExpensesModaladdExpenseTabelHeaderDate).toHaveText("Date")
  await expect(fuelExpenses.fuelExpensesModaladdExpenseTabelHeaderMileage).toHaveText("Mileage")
  await expect(fuelExpenses.fuelExpensesModaladdExpenseTabelHeaderLiters).toHaveText("Liters used")
  await expect(fuelExpenses.fuelExpensesModaladdExpenseTabelHeaderTotalCost).toHaveText("Total cost")
})

test('The user can remove expense entries', async ({ welcomePageFixture, page }) => {
  const garage = new GaragePage(page)
  const fuelExpenses = new FuelExpenses(page)

  //Add a car
  await garage.addCarBtn.click()
  await garage.kmField.fill('100')

  await page.waitForTimeout(5000)

  await garage.addCarDataBtn.click()
  await page.waitForTimeout(5000)

  await fuelExpenses.fuelExpensesMenu.click()

  await fuelExpenses.fuelExpensesDropdownListModel.click()
  await expect(fuelExpenses.fuelExpensesDropdownListModelItems).toBeVisible()

  await fuelExpenses.addExpense.click()
  await page.waitForTimeout(1000)
  await fuelExpenses.fuelExpensesModaladdExpenseMileage.fill('500')
  await fuelExpenses.fuelExpensesModaladdExpenseLiters.fill('10')
  await fuelExpenses.fuelExpensesModaladdExpenseTotalCost.fill('10')
  await fuelExpenses.addFuelExpensesDataBtn.click()
 
  await fuelExpenses.fuelExpensesModaladdExpenseTabelBody.hover()
  await fuelExpenses.fuelExpensesModaladdExpenseTabelBodyDeleteButton.click()

  const date = await fuelExpenses.fuelExpensesDate.textContent();
  let messageAndformatDate = `Do you really want to remove fuel expense entry from ${date}?`
  await expect(fuelExpenses.fuelExpensesModaladdExpenseRemoveModalContent).toHaveText(messageAndformatDate)

  await fuelExpenses.fuelExpensesModaladdExpenseModalRemoveBtn.click()
  await expect(fuelExpenses.fuelExpensesEmptyItem).toHaveText("You don’t have any fuel expenses filed in")
})

test('The user can edit expense entries', async ({ welcomePageFixture, page }) => {
  const garage = new GaragePage(page)
  const fuelExpenses = new FuelExpenses(page)

  //Add a car
  await garage.addCarBtn.click()
  await garage.kmField.fill('100')

  await page.waitForTimeout(5000)

  await garage.addCarDataBtn.click()
  await page.waitForTimeout(5000)

  await fuelExpenses.fuelExpensesMenu.click()

  await fuelExpenses.fuelExpensesDropdownListModel.click()
  await expect(fuelExpenses.fuelExpensesDropdownListModelItems).toBeVisible()

  await fuelExpenses.addExpense.click()
  await page.waitForTimeout(1000)
  await fuelExpenses.fuelExpensesModaladdExpenseMileage.fill('500')
  await fuelExpenses.fuelExpensesModaladdExpenseLiters.fill('10')
  await fuelExpenses.fuelExpensesModaladdExpenseTotalCost.fill('10')
  await fuelExpenses.addFuelExpensesDataBtn.click()
 
  await fuelExpenses.fuelExpensesModaladdExpenseTabelBody.hover()
  await fuelExpenses.fuelExpensesModaladdExpenseTabelBodyEditButton.click()

  await expect(fuelExpenses.fuelExpensesModaladdExpenseModalEditTitle).toHaveText("Edit an expense")
  await fuelExpenses.fuelExpensesModalCloseIcon.click()
})