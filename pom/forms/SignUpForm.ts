import { Locator, Page } from "@playwright/test";

export default class SignUpForm {
    readonly page: Page;
    readonly nameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly repeatPasswordField: Locator;
    readonly registerButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword');
        this.repeatPasswordField = page.locator('#signupRepeatPassword');
        this.registerButton = page.locator('.modal-footer button');
    }

    async triggerErrorOnField(fieldName: string) {
        let field;
    
        switch (fieldName) {
            case 'name':
                field = this.nameField;
                break;
            case 'lastName':
                field = this.lastNameField;
                break;
            case 'email':
                field = this.emailField;
                break;
            case 'password':
                field = this.passwordField;
                break;
            case 'reenterPassword':
                field = this.repeatPasswordField;
                break;
            default:
                throw new Error(`Field ${fieldName} is not defined.`);
        }
    
        await field.focus();
        await field.blur();
    }

    async clickNameField() {
        await this.nameField.click();
    }

    async fillNameField(name: string) {
        await this.nameField.fill(name);
    }

    async verifyNameFieldError() {
        return this.page.locator('#signupName + .invalid-feedback').textContent();
    }

    async clickLastNameField() {
        await this.lastNameField.click();
    }

    async fillLastNameField(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async verifyLastNameFieldError() {
        return this.page.locator('#signupLastName + .invalid-feedback').textContent();
    }

    async clickEmailField() {
        await this.emailField.click();
    }

    async fillEmailField(email: string) {
        await this.emailField.fill(email);
    }

    async verifyEmailFieldError() {
        return this.page.locator('#signupEmail + .invalid-feedback').textContent();
    }

    async clickPasswordField() {
        await this.passwordField.click();
    }

    async fillPasswordField(password: string) {
        await this.passwordField.fill(password);
    }

    async verifyPasswordFieldError() {
        return this.page.locator('#signupPassword + .invalid-feedback').textContent();
    }

    async clickRepeatPasswordField() {
        await this.repeatPasswordField.click();
    }

    async fillRepeatPasswordField(password: string) {
        await this.repeatPasswordField.fill(password);
    }

    async verifyRepeatPasswordFieldError() {
        return this.page.locator('#signupRepeatPassword + .invalid-feedback').textContent();
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }
    
    async signupWithFilledFields(name: string, lastName: string, email: string, password: string) {
        await this.fillNameField(name);
        await this.fillLastNameField(lastName);
        await this.fillEmailField(email);
        await this.fillPasswordField(password);
        await this.fillRepeatPasswordField(password);
        await this.clickRegisterButton;
    }

}