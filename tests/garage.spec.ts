import { expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';
import { credentials } from '../test-data/usersData';
import { test } from '../test-data/fixtures/userGaragePage';

test.describe('Garage Page', () => {
    test.use({ storageState: 'userOneState.json' });
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await garagePage.openPage();
    });


    test('Verify profile button is visible for logged user', async ({ userGaragePage }) => {
        await expect(garagePage.profileButton).toBeVisible();
    });

    test('Add BMW X6', async ({ userGaragePage }) => {
        await garagePage.addCarByBrandAndModel('BMW', 'X6');
        expect('BMW X6').toBe(await garagePage.getLastAddedCarName());
    });

    test('Add a car 1', async ({ userGaragePage }) => {
        await garagePage.addCarByBrandAndModel('Ford', 'Fiesta');
        expect('Ford Fiesta').toBe(await garagePage.getLastAddedCarName());
    });

});