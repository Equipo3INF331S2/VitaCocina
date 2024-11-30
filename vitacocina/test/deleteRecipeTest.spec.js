const {Builder, By, until, Key} = require('selenium-webdriver');

const path = require('path');

async function loginTest() { 
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // LOGIN
    await driver.get('localhost:3000/login');
  
    await driver.wait(until.elementLocated(By.css('#email'), 10000));
  
    let email = await driver.findElement(By.css('#email'));
    await email.sendKeys('usuario1@example.com');
  
    let password = await driver.findElement(By.css('#password'));
    await password.sendKeys('contraseña123');
  
    let loginButton = await driver.findElement(By.css('#loginButton'));
    await loginButton.click();

    await driver.wait(until.alertIsPresent(), 10000);

    let alert = await driver.switchTo().alert();
    await alert.accept();

    await driver.wait(until.urlIs('http://20.201.119.103:3000/'), 10000);

    console.log('Test Inicio de Sesion Exitoso')

    // CREATE RECIPE
    await driver.get('http://20.201.119.103:3000/createRecipe');
    await driver.wait(until.elementLocated(By.css('#title'), 10000));

    let title = await driver.findElement(By.css('#title'));
    await title.sendKeys('TEST');

    let description = await driver.findElement(By.css('#description'));
    await description.sendKeys('TEST');

    let img = await driver.findElement(By.css('#img'));
    await img.sendKeys(path.resolve('./utils/test.jpg'));

    let ingredients = await driver.findElement(By.css('#ingredients'));
    await ingredients.sendKeys('TEST');

    let instructions = await driver.findElement(By.css('#instructions'));
    await instructions.sendKeys('TEST');

    let dietaryPreferences = await driver.findElement(By.css('#dietaryPreferences'));
    await dietaryPreferences.click();
    let veganItem = await driver.wait(
      until.elementLocated(By.css('li[data-value="Vegano"]')),
      10000
    );
    await veganItem.click();

    let time = await driver.findElement(By.css('#time'));
    await time.click();
    let timeItem = await driver.wait(
      until.elementLocated(By.css('li[data-value="Menos de 30 min"]')),
      10000
    );
    await timeItem.click();
    
    let difficulty = await driver.findElement(By.css('#difficulty'));
    await difficulty.click();
    let difficultyItem = await driver.wait(
      until.elementLocated(By.css('li[data-value="Principiante"]')),
      10000
    );
    await difficultyItem.click();


    let createRecipeButton = await driver.findElement(By.css('#createRecipeButton'));
    createRecipeButton.click();

    await driver.wait(until.alertIsPresent(), 10000);
    let alert2 = await driver.switchTo().alert();
    await alert2.accept();

    await driver.wait(until.urlIs('http://20.201.119.103:3000/'), 10000);

    console.log('Test Creación de Receta Exitoso')

    // DELETE RECIPE
    await driver.get('http://20.201.119.103:3000/posts');
    
    await driver.wait(until.urlContains('/posts'), 10000);
    await driver.wait(until.elementLocated(By.css('#TESTDelete'), 10000));

    let deleteRecipeButton = await driver.findElement(By.css('#TESTDelete'));
    deleteRecipeButton.click();
    
    await driver.wait(until.stalenessOf(deleteRecipeButton), 10000);

    console.log('Test Borrar Receta Exitoso')

    console.log('loginTest exitoso');
  } catch (err) {
    console.error(`Error durante la prueba: ${err}`);
  } finally {
    await driver.quit();
  }
};

loginTest();