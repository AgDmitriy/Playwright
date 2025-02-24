import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import HomePage from '../pom/pages/HomePage';
import SignUpForm from '../pom/forms/SignUpForm';
import { sign, Sign } from 'crypto';
import GaragePage from '../pom/pages/GaragePage';

test.describe('Registration test', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        garagePage = new GaragePage(page);

        await homePage.open();
        await homePage.clickSignUpButton();

    })

    test.describe('Verify "Name" field validations', () => {
        test('Verify Name empty field', async () => {
            await signUpForm.clickNameField();
            await signUpForm.triggerErrorOnField('name');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyNameFieldError()).toBe('Name required');
        });

        test('Verify low data input for Name field', async () => {
            await signUpForm.fillNameField('a');
            await signUpForm.triggerErrorOnField('name');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyNameFieldError()).toBe('Name has to be from 2 to 20 characters long');
        });

        test('Verify high data input for Name field', async () => {
            await signUpForm.fillNameField('twentyonecharactercountname');
            await signUpForm.triggerErrorOnField('name');
            expect(await signUpForm.verifyNameFieldError()).toBe('Name has to be from 2 to 20 characters long');
        });

        test('Verify Trim in input for Name field', async () => {
            await signUpForm.fillNameField('a   ');
            await signUpForm.triggerErrorOnField('name');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyNameFieldError()).toBe('Name is invalid');
        });

        test('Verify spaces in input for Name field', async () => {
            await signUpForm.fillNameField('String with spaces');
            await signUpForm.triggerErrorOnField('name');
            expect(await signUpForm.verifyNameFieldError()).toBe('Name is invalid');
        });

        test('Verify not English letters for Name field', async () => {
            await signUpForm.fillNameField('НеІнглішЛеттерс');
            await signUpForm.triggerErrorOnField('name');
            expect(await signUpForm.verifyNameFieldError()).toBe('Name is invalid');
        });
    });

    test.describe('Verify "Last name" field validations', () => {
        test('Verify empty "Last name" field input', async () => {
            await signUpForm.clickLastNameField();
            await signUpForm.triggerErrorOnField('lastName');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyLastNameFieldError()).toBe('Last name required');
        });

        test('Verify low data input for Last name field', async () => {
            await signUpForm.fillLastNameField('a');
            await signUpForm.triggerErrorOnField('lastName');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyLastNameFieldError()).toBe('Last name has to be from 2 to 20 characters long');
        });

        test('Verify high data input for Last name field', async () => {
            await signUpForm.fillLastNameField('twentyonecharactercountname');
            await signUpForm.triggerErrorOnField('lastName');
            expect(await signUpForm.verifyLastNameFieldError()).toBe('Last name has to be from 2 to 20 characters long');
        });

        test('Verify Trim in input for Last name field', async () => {
            await signUpForm.fillLastNameField('a   ');
            await signUpForm.triggerErrorOnField('lastName');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyLastNameFieldError()).toBe('Last name is invalid');
        });

        test('Verify spaces in input for Last name field', async () => {
            await signUpForm.fillLastNameField('String with spaces');
            await signUpForm.triggerErrorOnField('lastName');
            expect(await signUpForm.verifyLastNameFieldError()).toBe('Last name is invalid');
        });

        test('Verify not English letters for Last name field', async () => {
            await signUpForm.fillLastNameField('НеІнглішЛеттерс');
            await signUpForm.triggerErrorOnField('lastName');
            expect(await signUpForm.verifyLastNameFieldError()).toBe('Last name is invalid');
        });
    });

    test.describe('Verify "Email" field validations', () => {
        test('Verify empty "Email" field input', async () => {
            await signUpForm.clickEmailField();
            await signUpForm.triggerErrorOnField('email');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyEmailFieldError()).toBe('Email required');
        });

        test('Verify without @ symbol input Email field validation', async () => {
            await signUpForm.fillEmailField('WithoutEmailsymbol');
            await signUpForm.triggerErrorOnField('email');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyEmailFieldError()).toBe('Email is incorrect');
        });

        test('Verify without dot after @ symbol input Email field validation', async () => {
            await signUpForm.fillEmailField('WithoutDotAfter@symbol');
            await signUpForm.triggerErrorOnField('email');
            expect(await signUpForm.verifyEmailFieldError()).toBe('Email is incorrect');
        });

        test('Verify without chars before @ symbol input Email field validation', async () => {
            await signUpForm.fillEmailField('@NoTextBefo.re');
            await signUpForm.triggerErrorOnField('email');
            expect(await signUpForm.verifyEmailFieldError()).toBe('Email is incorrect');
        });

        test('Verify 1 char after dot input Email field validation', async () => {
            await signUpForm.fillEmailField('OneChar@afte.r');
            await signUpForm.triggerErrorOnField('email');
            expect(await signUpForm.verifyEmailFieldError()).toBe('Email is incorrect');
        });

        test('Verify 1+space char after dot input Email field validation', async () => {
            await signUpForm.fillEmailField('Space@afte.r ');
            await signUpForm.triggerErrorOnField('email');
            expect(await signUpForm.verifyEmailFieldError()).toBe('Email is incorrect');
        });

        test('Verify not English letters for Email field validation', async () => {
            await signUpForm.fillEmailField('НеІнглішЛеттерс@емейл.ком');
            await signUpForm.triggerErrorOnField('email');
            expect(await signUpForm.verifyEmailFieldError()).toBe('Email is incorrect');
        });
    });

    test.describe('Verify "Password" field validations', () => {
        test('Verify empty "Password" field validation', async () => {
            await signUpForm.clickPasswordField();
            await signUpForm.triggerErrorOnField('password');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyPasswordFieldError()).toBe('Password required');
        });

        test('Verify low input for "Password" field validation', async () => {
            await signUpForm.fillPasswordField('Seven7!');
            await signUpForm.triggerErrorOnField('password');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyPasswordFieldError()).toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        test('Verify high input for "Password" field validation', async () => {
            await signUpForm.fillPasswordField('sixteenChars-16!');
            await signUpForm.triggerErrorOnField('password');
            expect(await signUpForm.verifyPasswordFieldError()).toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        test('Verify all small letters input for "Password" field validation', async () => {
            await signUpForm.fillPasswordField('allsmallletters1!');
            await signUpForm.triggerErrorOnField('password');
            expect(await signUpForm.verifyPasswordFieldError()).toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        test('Verify all capital letters input for "Password" field validation', async () => {
            await signUpForm.fillPasswordField('ALLCAPITAL!1');
            await signUpForm.triggerErrorOnField('password');
            expect(await signUpForm.verifyPasswordFieldError()).toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });

        test('Verify all digits letters input for "Password" field validation', async () => {
            await signUpForm.fillPasswordField('123456789');
            await signUpForm.triggerErrorOnField('password');
            expect(await signUpForm.verifyPasswordFieldError()).toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        });
    });

    test.describe('Verify "Re-enter Password" field validations', () => {
        test('Verify empty "Re-enter password" field validation', async () => {
            await signUpForm.clickRepeatPasswordField();
            await signUpForm.triggerErrorOnField('reenterPassword');
            await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyRepeatPasswordFieldError()).toBe('Re-enter password required');
        });
        test('Verify "Re-enter password" field not matches "Password" validation', async () => {
            await signUpForm.fillPasswordField('ValidValue1');
            await signUpForm.fillRepeatPasswordField('ValidValue2');
            await signUpForm.triggerErrorOnField('reenterPassword');
            await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            expect(await signUpForm.verifyRepeatPasswordFieldError()).toBe('Passwords do not match');
        });
    });
    
    test('Positive registration flow', async ({ page }) => {

        await signUpForm.fillNameField(faker.person.firstName());
        await signUpForm.fillLastNameField(faker.person.lastName());
        await signUpForm.fillEmailField(faker.internet.email());
        await signUpForm.fillPasswordField('ValidPass1');
        await signUpForm.fillRepeatPasswordField('ValidPass1');
        expect(signUpForm.registerButton).toBeVisible();
        expect(signUpForm.registerButton).toHaveText('Register');
        await signUpForm.clickRegisterButton();


        expect(await garagePage.profileButton.isVisible());
        expect(await garagePage.getSuccessSignupToastText()).toBe('Registration complete');

    });
});