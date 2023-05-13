import puppeteer from "puppeteer";
import config from "../../config.mjs";
import { Browser } from "../models/models.js";

export const browser = await puppeteer.launch({
  headless: "new",
  //executablePath: "/usr/bin/google-chrome-stable",
  args: [
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-setuid-sandbox",
    "--no-first-run",
    "--no-sandbox",
    "--no-zygote",
    "--single-process",
  ],
});

let cookies = null;

export async function setupBrowser() {
  const browser = await getOrCreateDionysiusBrowser();

  if (browser.cookies) {
    console.log("Browser: found saved cookies - saving as global");
    cookies = JSON.parse(browser.cookies);
  } else {
    console.log(
      "Browser: did not find cookies - logging in and saving new set"
    );
    await loginAndSetCookies();
  }
  console.log("Browser: setup complete");
}

export async function newPage() {
  const page = await browser.newPage();
  await page.setCookie(...cookies);
  return page;
}

async function getOrCreateDionysiusBrowser() {
  try {
    let browser = null;
    browser = await Browser.findOne({ code: "dionysius" });

    if (!browser) {
      console.log(
        "Browser: found no browser in MongoDB, creating new instance"
      );
      browser = new Browser();
      await browser.save();
    }
    return browser;
  } catch (err) {
    console.error("Browser: error getting browser:", err);
    return false;
  }
}

async function loginAndSetCookies() {
  console.log("Browser: beginning log-in sequence");

  const page = await browser.newPage();
  await page.goto(config.service.baseUrl);
  await page.waitForSelector("li.vipmenu ");
  await page.click("li.vipmenu ");
  await page.click("li.vipmenu a.nav-link.dropdown-item.pointer");

  humanise();

  await page.waitForSelector(".loginbd .uname");
  await page.click(".loginbd .uname");
  await page.type(".loginbd .uname", config.service.login.username);

  humanise();

  await page.waitForSelector(".loginbd .passw");
  await page.click(".loginbd  .passw");
  await page.type(".loginbd  .passw", config.service.login.password);

  humanise();

  await Promise.all([
    page.waitForNavigation(), // The promise resolves after navigation has finished
    page.click(".loginbd  #loginbtnbd"), // Clicking the link will indirectly cause a navigation
  ]);

  console.log("Browser: log-in sequence complete");

  cookies = await page.cookies();
  await saveBrowserCookies(cookies);

  await page.close();
}

async function humanise() {
  let randomTime = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
  await new Promise((r) => setTimeout(r, randomTime));
}

async function saveBrowserCookies(cookies) {
  console.log(`Browser: saving cookies`);

  try {
    const browser = await Browser.findOneAndUpdate(
      { code: "dionysius" },
      {
        lastUpdated: new Date(),
        cookies: JSON.stringify(cookies),
      },
      { new: true, upsert: true }
    );

    console.log("Browser: saved browser cookies to DB");

    return browser;
  } catch (err) {
    console.error("Browser: error saving cookies:", err);
    return false;
  }
}
