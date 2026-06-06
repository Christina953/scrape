import puppeteer from 'puppeteer';

// Launch the browser and open a new blank page.
const browser = await puppeteer.launch({
    headless: false
});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://www.crime.ee/');

// Set the screen size.
await page.setViewport({width: 1920, height: 1000});
// Wait and click on first result.
await page.locator('#blue').click();
// Type into search box using accessible input name.
await page.locator('#username3').fill('puppet12');
await page.locator('#password3').fill('puppet44');
// Wait and click on first result.
await page.locator('#login-3 button[type="submit"]').click();


// await browser.close();