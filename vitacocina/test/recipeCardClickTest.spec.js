const { Builder, By, until } = require('selenium-webdriver');

async function recipeCardClickTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://20.201.119.103:3000/');


    await driver.wait(until.elementLocated(By.css('.RecipeCard')), 10000); 
    const currentUrl = await driver.getCurrentUrl();

    const recipeCard = await driver.findElement(By.css('.RecipeCard')); 
    await recipeCard.click();

    await driver.wait(until.urlContains('/recipes/'), 10000);

    
    const newUrl = await driver.getCurrentUrl();
    if (currentUrl === newUrl) {
        throw new Error("La URL no cambio luego de apretar la card!");
    }

    console.log('recipeCardClickTest Exitoso');

  } catch (err) {
    console.error(`Error durante la prueba: ${err}`);

  } finally {
    await driver.quit();
  }
}

recipeCardClickTest();