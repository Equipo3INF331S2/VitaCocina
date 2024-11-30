const {Builder, By, until} = require('selenium-webdriver');

async function loginTest() { 
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
  
    await driver.get('http://20.201.119.103:3000/login');
  
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
  
    console.log('Prueba exitosa');
  } catch (err) {
    console.error(`Error durante la prueba: ${err}`);
  } finally {
    await driver.quit();
  }
};

loginTest();