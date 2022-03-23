const { test, expect } = require('@playwright/test');

test('Navigation test 001', async ({ page }) => {
    //Homepage
    await page.goto('/en-gb', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL('https://www.moneycorp.com/en-gb');
    await expect(page).toHaveTitle('International Payments & Currency Exchange | moneycorp');

    const caption = page.locator('.caption > h1');
    await expect(caption).toBeVisible();
    await expect(caption).toHaveText('Global specialists in currency exchange & international payments');

    //Accept cookies
    const acceptCookies = page.locator('//button[@id="onetrust-accept-btn-handler"]');
    await acceptCookies.click();

    //Close 'Effective Immediately: RUB and UAH payments...' popup
    const addThisClose = page.locator('div.addthis_bar_x_container');
    await addThisClose.click();

    //Select language
    const language = page.locator('//button[@id="language-dropdown-flag"]');
    await expect(language).toBeVisible;
    await language.click();

    const languageUSA = page.locator('//nav[@id="nav-languages-overlay"]//a[span[.="USA"]]')
    await languageUSA.click();
    await expect(page).toHaveURL('https://www.moneycorp.com/en-us/');

    //Click Find Out More
    const findOutMore = page.locator('//div/div[h3[text()="Foreign exchange solutions"]]/a[contains(.,"Find out more ")]')
    await findOutMore.click();

    await expect(page).toHaveURL('https://www.moneycorp.com/en-us/business/foreign-exchange-solutions/');

    //Search for international payments
    const search = page.locator('//button[contains(concat(" ",normalize-space(@class)," ")," navigation-search ")]')
    await search.click();

    const searchInput = page.locator('//input[@id="nav_search"]')
    await searchInput.click();
    await searchInput.type('international payments');
    await searchInput.press('Enter');

    const expectedSearchURL = 'https://www.moneycorp.com/en-us/search/?q=international+payments';
    await expect(page).toHaveURL(expectedSearchURL);

    //Check search results
    expectedResultUrl = new RegExp('https:\/\/www.moneycorp.com\/en-us\/.*')

    const maxResults = 50;

    for (let i = 1; i < maxResults; i++) {
        if (i > 10) {
            //Accelerate through old results
            i += 9;

            //Click Show more results
            for (let j = 1; j <= Math.floor(i / 10); j++) {
                showMore = await page.locator('//a[contains(.,"Show more results")]');
                await showMore.click();
                await page.locator('//div[@class="results clearfix"][' + ((j + 1) * 10) + ']/div/a');
            }
        }
        searchResult = page.locator('//div[@class="results clearfix"][' + i + ']/div/a');
        await searchResult.click();
        await expect(page).toHaveURL(expectedResultUrl);
        console.log('Search result link ' + i + ' is ' + page.url());
        await page.goto(expectedSearchURL);
    }
    console.log('Complete');
});