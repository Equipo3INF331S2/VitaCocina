const { Builder, By, until } = require('selenium-webdriver');

async function clickTipsTitleTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('20.201.119.103:3000/');

    await driver.wait(until.elementLocated(By.linkText('Consejos')), 10000);
    const tipsLink = await driver.findElement(By.linkText('Consejos'));
    await tipsLink.click();

    await driver.wait(until.urlContains('/alltip'), 10000);

    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes('/alltip')) {
      throw new Error('No se navegó a la página "All Tips" correctamente');
    }

    console.log('clickTipsTitleTest Exitoso');

  } catch (err) {
    console.error(`Error durante la prueba: ${err}`);

  } finally {
    await driver.quit();
  }
}

clickTipsTitleTest();