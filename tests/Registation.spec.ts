// напишіть тести за наявними вимогами

// 1 позитивний сценарій

// n негативних сценаріїв - їх кількість залежить від того як добре ви розумієте вимоги та роботу веб застосунків (мінімально 5 тестів)

// ВИМОГА до юзерів яких ви будете створювати - їх email адреса має починатися з якогось префіксу. Таким чином ви зможете відрізняти юзерів створених автотестами від інших.

// Наприклад префікс"aqa". Приклад email адреси aqa-staran@test.com


import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Registration test', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
        await page.getByRole('button', { name: 'Sign up' }).click();
    })

    test('Verify "Name" field validation', async ({ page }) => {
        await page.locator('#signupName').click();
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupName+div')).toHaveText('Name required');

        await page.locator('#signupName').fill('a');
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupName+div')).toHaveText('Name has to be from 2 to 20 characters long');

        await page.locator('#signupName').fill('twentyonecharactercountname');
        await page.locator('#signupName').blur();
        expect(page.locator('#signupName+div')).toHaveText('Name has to be from 2 to 20 characters long');

        await page.locator('#signupName').fill('a   ');
        await page.locator('#signupName').blur();
        await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupName+div')).toHaveText('Name is invalid');

        await page.locator('#signupName').fill('String with space');
        await page.locator('#signupName').blur();
        expect(page.locator('#signupName+div')).toHaveText('Name is invalid');

        await page.locator('#signupName').fill('НеІнглішЛеттерс');
        await page.locator('#signupName').blur();
        expect(page.locator('#signupName+div')).toHaveText('Name is invalid');
    });

    test('Verify incorrect "Last name" field input', async ({ page }) => {
        await page.locator('#signupLastName').click();
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupLastName+div')).toHaveText('Last name required');

        await page.locator('#signupLastName').fill('a');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupLastName+div')).toHaveText('Last name has to be from 2 to 20 characters long');

        await page.locator('#signupLastName').fill('twentyonecharactercountname');
        await page.locator('#signupLastName').blur();
        expect(page.locator('#signupLastName+div')).toHaveText('Last name has to be from 2 to 20 characters long');

        await page.locator('#signupLastName').fill('a   ');
        await page.locator('#signupLastName').blur();
        await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupLastName+div')).toHaveText('Last name is invalid');

        await page.locator('#signupLastName').fill('String with space');
        await page.locator('#signupLastName').blur();
        expect(page.locator('#signupLastName+div')).toHaveText('Last name is invalid');

        await page.locator('#signupLastName').fill('НеІнглішЛеттерс');
        await page.locator('#signupLastName').blur();
        expect(page.locator('#signupLastName+div')).toHaveText('Last name is invalid');
    });

    test('Verify incorrect "Email" field input', async ({ page }) => {
        await page.locator('#signupEmail').click();
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupEmail+div')).toHaveText('Email required');

        await page.locator('#signupEmail').fill('WithoutEmailsymbol');
        await page.locator('#signupEmail').blur();
        await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupEmail+div')).toHaveText('Email is incorrect');

        await page.locator('#signupEmail').fill('WithoutDotAfter@symbol');
        await page.locator('#signupEmail').blur();
        expect(page.locator('#signupEmail+div')).toHaveText('Email is incorrect');

        await page.locator('#signupEmail').fill('@NoTextBefo.re');
        await page.locator('#signupEmail').blur();
        expect(page.locator('#signupEmail+div')).toHaveText('Email is incorrect');

        await page.locator('#signupEmail').fill('OneChar@afte.r');
        await page.locator('#signupEmail').blur();
        expect(page.locator('#signupEmail+div')).toHaveText('Email is incorrect');

        await page.locator('#signupEmail').fill('Space@afte.r ');
        await page.locator('#signupEmail').blur();
        expect(page.locator('#signupEmail+div')).toHaveText('Email is incorrect');

        await page.locator('#signupEmail').fill('НеІнглішЛеттерс@емейл.ком');
        await page.locator('#signupEmail').blur();
        expect(page.locator('#signupEmail+div')).toHaveText('Email is incorrect');
    });

    test('Verify incorrect "Password" field input', async ({ page }) => {
        await page.locator('#signupPassword').click();
        await page.locator('#signupPassword').blur();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupPassword+div')).toHaveText('Password required');

        await page.locator('#signupPassword').fill('Seven7!');
        await page.locator('#signupPassword').blur();
        await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupPassword+div')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        await page.locator('#signupPassword').fill('sixteenChars-16!');
        await page.locator('#signupPassword').blur();
        expect(page.locator('#signupPassword+div')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        await page.locator('#signupPassword').fill('allsmallletters1!');
        await page.locator('#signupPassword').blur();
        expect(page.locator('#signupPassword+div')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        await page.locator('#signupPassword').fill('ALLCAPITAL!1');
        await page.locator('#signupPassword').blur();
        expect(page.locator('#signupPassword+div')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        await page.locator('#signupPassword').fill('123456789');
        await page.locator('#signupPassword').blur();
        expect(page.locator('#signupPassword+div')).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Verify "Re-enter password" field validation', async ({ page }) => {
        await page.locator('#signupRepeatPassword').click();
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupRepeatPassword+div')).toHaveText('Re-enter password required');

        await page.locator('#signupPassword').fill('ValidValue1')
        await page.locator('#signupRepeatPassword').fill('ValidValue2');
        await page.locator('#signupRepeatPassword').blur();
        await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        expect(page.locator('#signupRepeatPassword+div')).toHaveText('Passwords do not match');
    });

    test('Positive registration flow', async ({ page }) => {

        await page.locator('#signupName').fill(faker.person.firstName());
        await page.locator('#signupLastName').fill(faker.person.lastName());
        await page.locator('#signupEmail').fill(faker.internet.email());
        await page.locator('#signupPassword').fill('ValidPass1');
        await page.locator('#signupRepeatPassword').fill('ValidPass1');
        await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Register' })).toHaveText('Register');
        await (page.getByRole('button', { name: 'Register' })).click();

        await page.waitForSelector('div[class$="alert-success"]');
        const successMessage = page.locator('div[class$="alert-success"]');
        await expect(successMessage).toHaveText('Registration complete')
    })
})