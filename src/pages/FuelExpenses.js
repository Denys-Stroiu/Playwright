import BasePage from "./BasePage"

export default class FuelExpenses extends BasePage {
	constructor(page) {
		super(page, "/panel/expenses")
		this.addExpense = this._page.getByRole("button", { name: "Add an expense" })
		this.fuelExpensesMenu = this._page.getByText('Fuel expenses').last()
		this.fuelExpensesDropdownMenuItem = this._page.getByRole("ngbdropdownitem", { name: "Fuel expenses" })
		this.fuelExpensesEmptyItem = this._page.locator('.panel-empty_message')
		this.fuelExpensesEmptyItemLink = this._page.locator(".panel-empty_message a")
		this.fuelExpensesEmptyItemImage = this._page.locator(".panel-page_empty svg")
		this.fuelExpensesModal = this._page.locator(".modal-content h4")
		this.fuelExpensesModalCloseIcon = this._page.locator(".modal-content .close")
		this.fuelExpensesDropdownListModel = this._page.locator(".car-select-dropdown")
		this.fuelExpensesDropdownListModelItems = this._page.locator(".car-select-dropdown ul li")
		this.fuelExpensesModaladdExpenseMileage = this._page.locator(".modal-content #addExpenseMileage")
		this.fuelExpensesModaladdExpenseLiters = this._page.locator(".modal-content #addExpenseLiters")
		this.fuelExpensesModaladdExpenseTotalCost = this._page.locator(".modal-content #addExpenseTotalCost")
		this.addFuelExpensesDataBtn = this._page.getByRole("button", { name: "Add" })
		this.fuelExpensesModaladdExpenseTabelHeaderDate = this._page.locator(".expenses_table tr th").nth(0)
		this.fuelExpensesModaladdExpenseTabelHeaderMileage = this._page.locator(".expenses_table tr th").nth(1)
		this.fuelExpensesModaladdExpenseTabelHeaderLiters = this._page.locator(".expenses_table tr th").nth(2)
		this.fuelExpensesModaladdExpenseTabelHeaderTotalCost = this._page.locator(".expenses_table tr th").nth(3)
		this.fuelExpensesModaladdExpenseModalEditTitle = this._page.locator(".modal-content .modal-title")
		this.fuelExpensesModaladdExpenseTabelBody = this._page.locator(".expenses_table tbody")
		this.fuelExpensesModaladdExpenseTabelBodyDeleteButton = this._page.locator(".expenses_table tbody td:last-child .btn-delete")
		this.fuelExpensesModaladdExpenseTabelBodyEditButton = this._page.locator(".expenses_table tbody td:last-child .btn-edit")
		this.fuelExpensesModaladdExpenseRemoveModalContent = this._page.locator(".modal-content p")
		this.fuelExpensesModaladdExpenseModalRemoveBtn = this._page.locator(".modal .btn-danger")
		this.fuelExpensesDate = this._page.locator("app-fuel-expenses tbody tr td").nth(0)
	}
}
