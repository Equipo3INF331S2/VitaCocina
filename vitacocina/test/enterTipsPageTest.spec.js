const { Builder, By, until } = require('selenium-webdriver');

async function tipsCardClickTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/');


    await driver.wait(until.elementLocated(By.css('.TipsCard')), 10000); 
    const currentUrl = await driver.getCurrentUrl();

    const tipsCard = await driver.findElement(By.css('.TipsCard')); 
    await tipsCard.click();

    await driver.wait(until.urlContains('/Tips/'), 10000);

    
    const newUrl = await driver.getCurrentUrl();
    if (currentUrl === newUrl) {
        throw new Error("La URL no cambio luego de apretar la card!");
    }

    console.log('tipsCardClickTest Exitoso');

  } catch (err) {
    console.error(`Error durante la prueba: ${err}`);

  } finally {
    await driver.quit();
  }
}

tipsCardClickTest();