import { test } from "@playwright/test";
import { Basic } from "../src/basic";
import { HeaderMenu } from "../src/headerMenu";
import { RegistrationForm } from "../src/registrationForm";
import { Account } from "../src/account";

test.describe("Test spec", async () => {
  test("valid test", async ({ page }) => {
    const basic = new Basic(page);
    const header = new HeaderMenu(page);
    const registrationForm = new RegistrationForm(page);
    const account = new Account(page);

    await basic.openPage("/");
    await header.openRegistrationForm();

    await registrationForm.enterUserName("Tom");
    await registrationForm.enterUsersignupLastName("Rid");
    await registrationForm.enterUsersEmail("aqa-tomRid3@gmail.com");
    await registrationForm.enterUsersPassword("Qa123456!");
    await registrationForm.enterUsersRePassword("Qa123456!");
    await registrationForm.clickOnRegistrationButton();
    await account.assertAccountMenu();

    //Remove data
    await account.removeAccount();

    await page.close();
  });

  test("name shold containt more that 2 characters", async ({ page }) => {
    const basic = new Basic(page);
    const header = new HeaderMenu(page);
    const registrationForm = new RegistrationForm(page);

    await basic.openPage("/");
    await header.openRegistrationForm();

    await registrationForm.enterUserName("Q");

    await registrationForm.enterUsersignupLastName("Q");
    await registrationForm.assertErrorMessage(
      "Name has to be from 2 to 20 characters long"
    );

    await page.close();
  });

  test("last name shold containt more that 2 characters", async ({ page }) => {
    const basic = new Basic(page);
    const header = new HeaderMenu(page);
    const registrationForm = new RegistrationForm(page);

    await basic.openPage("/");
    await header.openRegistrationForm();

    await registrationForm.enterUsersignupLastName("Q");

    await registrationForm.pressTabButton();
    await registrationForm.assertErrorMessage(
      "Last name has to be from 2 to 20 characters long"
    );

    await page.close();
  });

  test("user can register only with valid email", async ({ page }) => {
    const basic = new Basic(page);
    const header = new HeaderMenu(page);
    const registrationForm = new RegistrationForm(page);

    await basic.openPage("/");
    await header.openRegistrationForm();

    await registrationForm.enterUserName("Name");
    await registrationForm.enterUsersignupLastName("LastName");
    await registrationForm.enterUsersEmail("aqa-tomRid");
    await registrationForm.enterUsersPassword("Qa123456!");
    await registrationForm.enterUsersRePassword("Qa123456!");

    await registrationForm.assertErrorMessage("Email is incorrect");
    await registrationForm.assertButton();

    await page.close();
  });
});
