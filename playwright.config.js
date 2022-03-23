const { devices } = require('@playwright/test');

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    use: {
        trace: 'on-first-retry', //or 'on'
        baseURL: 'https://www.moneycorp.com/',
        headless: false,
        viewport: null,
    },
    timeout: 3 * 60 * 1000,
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
 /*       {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },*/
    ],
};

module.exports = config;