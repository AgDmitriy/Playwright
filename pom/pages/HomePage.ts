import { Locator, Page } from "@playwright/test";

export default class HomePage {
    readonly page: Page;
    readonly signUpButton : Locator;
    readonly signInButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.signUpButton = page.getByText('Sign Up')
        this.signInButton = page.locator('//*[contains(@class, "header_signin")]');
    }

    async open(){
        await this.page.goto('/');
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async clickSignInButton(){
        await this.signInButton.click();
    }

}