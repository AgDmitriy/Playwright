import { test as base, chromium } from '@playwright/test';
import GaragePage from '../../pom/pages/GaragePage';

const STORAGE_STATE_PATH = 'userOneState.json';

type fixturePages = {
    garagePage: GaragePage;
    userGaragePage: GaragePage;
  };
  
  let garagePage: GaragePage;
  let userGaragePage: GaragePage;

  export const test = base.extend<fixturePages>({
    userGaragePage: async({ }, use) => {
      const browser = await chromium.launch();
        const context = await browser.newContext({ storageState: STORAGE_STATE_PATH });
        const page = await context.newPage();

        // await page.goto('/garage');

        await use(new GaragePage(page));

        await browser.close();

    }
  })
  
