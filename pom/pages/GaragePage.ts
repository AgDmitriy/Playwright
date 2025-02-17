import { expect, Locator, Page } from '@playwright/test';

export default class GaragePage {
    readonly h3: Locator;
    readonly profileButton: Locator;
    readonly successSignupToast: Locator;
    readonly pageHeader: Locator;
    readonly addNewCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly submitFormButton: Locator;
    readonly lastAddedCarName: Locator;
    readonly carsList: Locator;

    constructor(readonly page: Page) {
        this.h3 = page.locator('h3');
        this.profileButton = page.locator('#userNavDropdown');
        this.successSignupToast = page.locator('div[class="alert alert-success"]');
        this.pageHeader = page.locator('//h1[text()="Garage"]');
        this.addNewCarButton = page.locator('//div[@class="panel-page"]//button[contains(@class, "btn-primary")]');
        this.brandDropdown = page.locator('//select[@id="addCarBrand"]');
        this.modelDropdown = page.locator('//select[@id="addCarModel"]');
        this.mileageField = page.locator('//input[@id="addCarMileage"]');
        this.submitFormButton = page.locator('//div[contains(@class, "modal-footer")]/button[contains(@class, "btn-primary")]');
        this.lastAddedCarName = page.locator('(//li//p[@class="car_name h2"])[1]');
        this.carsList = page.locator('//div[contains(@class, "car ")]');
    }

    async getSuccessSignupToastText() {
        return this.successSignupToast.textContent();
    }


    async openPage() {
        await this.page.goto('/panel/garage');
    }

    async verifyPageIsOpen() {
        await expect(this.pageHeader).toBeVisible();
    }

    async addCarByBrandAndModel(brand: string, model: string) {
        await this.addNewCarButton.click();
        await this.brandDropdown.selectOption(brand);
        await this.page.waitForTimeout(300);
        await this.modelDropdown.selectOption(model);
        await this.mileageField.fill('555');
        await this.submitFormButton.click();
    }
    
    async getLastAddedCarName(): Promise<string> {
        await this.page.waitForTimeout(300);
        return await this.lastAddedCarName.innerText();
    }

    async removeLastAddedCar() {
        const car = await this.carsList.first();
        await car.locator('//span[contains(@class, "icon-edit")]').click();
        await this.page.locator('//button[contains(@class, "btn-outline-danger")]').click();
        await this.page.locator('//button[contains(@class, "btn-danger")]').click();
    }

};