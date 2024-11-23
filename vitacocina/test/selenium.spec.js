const {Builder, By, Key, until} = require('selenium-webdriver');

async function testSearch() {
  let driver = await new Builder().forBrowser('chrome').build(); // Cambia 'chrome' por el navegador que uses

  try {
    await driver.get('http://localhost:3000/'); // Reemplaza con la URL de tu aplicación

    // Esperar a que el elemento de búsqueda sea visible (ajusta el selector CSS)
    await driver.wait(until.elementLocated(By.css('#search-input')), 10000); 

    // Ingresar el término de búsqueda
    let searchInput = await driver.findElement(By.css('#search-input'));
    await searchInput.sendKeys('pollo', Key.RETURN); // Buscamos "pollo"

    // Esperar a que aparezcan los resultados (ajusta el selector CSS)
    await driver.wait(until.elementLocated(By.css('.search-result')), 10000);

    // Verificar que hay resultados (ejemplo simple)
    let results = await driver.findElements(By.css('.search-result'));
    if (results.length > 0) {
      console.log('Prueba exitosa: Se encontraron resultados para la búsqueda.');
    } else {
      console.error('Prueba fallida: No se encontraron resultados.');
    }

  } finally {
    await driver.quit();
  }
}

testSearch();