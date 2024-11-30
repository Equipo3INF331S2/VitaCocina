const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function clickRecipeTitleTest() {
  
  
  //let driver = await new Builder().forBrowser('chrome').build();
  let options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments('--disable-gpu');
  let driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

  try {
    await driver.get(`http://localhost:3000/`);

    await driver.wait(until.elementLocated(By.linkText('Recetas')), 10000);
    const recipeLink = await driver.findElement(By.linkText('Recetas'));
    await recipeLink.click();

    await driver.wait(until.urlContains('/allrecipe'), 10000);

    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes('/allrecipe')) {
      throw new Error('No se navegó a la página "All Recipes" correctamente');
    }

    console.log('clickRecipeTitleTest Exitoso');

  } catch (err) {
    console.error(`Error durante la prueba: ${err}`);

  } finally {
    await driver.quit();
  }
}

clickRecipeTitleTest();