import { test, expect } from "@playwright/test"
import { credentials } from "../../test-data/usersData"


test.describe("Garage API Tests", () => {
    let sessionCookie: string;
    let addedCarsIds: number[] = [];

    test.beforeAll(async ({ request }) => {
        const responseAuth = await request.post('/api/auth/signin', {
            data: {
                email: credentials.userOne.email,
                password: credentials.userOne.password,
            },
        });

        expect(responseAuth.status()).toBe(200);
        sessionCookie = responseAuth.headers()['set-cookie'].split(';')[0];
        expect(sessionCookie).toBeDefined();
    });

    test("Create new car", async ({ request }) => {
        const responseCreateCar = await request.post(`/api/cars`, {
            data: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 122
            },
            headers: {
                'Cookie': sessionCookie
            }
        });

        expect(responseCreateCar.status()).toBe(201);
        const responseCreateCarJson = await responseCreateCar.json();
        expect(responseCreateCarJson.status).toBe('ok');
        expect(responseCreateCarJson.data.carBrandId).toBe(1);
        expect(responseCreateCarJson.data.carModelId).toBe(1);
        addedCarsIds.push(responseCreateCarJson.data.id);
    });

    test("Verify BE required fields validation", async ({ request }) => {
        const response = await request.post(`/api/cars`, {
            data: {
                "mileage": 122
            },
            headers: {
                'Cookie': sessionCookie
            }
        });

        expect(response.status()).toBe(400);
        const responseJson = await response.json();
        expect(responseJson.status).toBe('error');
    });

    test("Create car with noт-existing carBrandId", async ({ request }) => {
        const response = await request.post(`/api/cars`, {
            data: {
                "carBrandId": 6,
                "carModelId": 1,
                "mileage": 122
            },
            headers: {
                'Cookie': sessionCookie
            }
        });

        expect(response.status()).toBe(404);
        const responseJson = await response.json();
        expect(responseJson.status).toBe('error');
    });


});