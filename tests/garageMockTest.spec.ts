import { test, expect } from "@playwright/test";
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import { credentials } from "../test-data/usersData";

test.describe(('Mocking'), () => {
    let signInForm: SignInForm;
    let homePage: HomePage;
    let mockName =  "Santa";
    let mockLastName = "Klaus";

    test('Verify fake Profile data', async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        await page.goto('/');
        await page.getByText('Sign in').click();

        const fakeProfileResponse = {

            "status": "ok",
            "data": {
                "userId": 100,
                "photoFilename": "default-user.png",
                "name": mockName,
                "lastName": mockLastName
            }
        }

        await page.route('**/profile', route => route.fulfill({
            body: JSON.stringify(fakeProfileResponse)
        })
        )
        await signInForm.loginWithCredentials(credentials.userOne.email, credentials.userOne.password);

        await page.locator('a[routerlink="profile"]').click();

        expect(await page.locator('p[class^="profile_name"]')).toHaveText(`${mockName} ${mockLastName}`);

    })


});
