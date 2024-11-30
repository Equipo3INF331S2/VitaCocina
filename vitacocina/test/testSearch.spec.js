const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testSearch() {
  //let driver = await new Builder().forBrowser('chrome').build(); // Cambia 'chrome' por el navegador que uses
  let options = new chrome.Options().headless();
  let driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

  try {
    // Acceder a la URL de tu aplicación
    await driver.get('http://20.201.119.103:3000/'); // Reemplaza con la URL de tu aplicación

    // Esperar a que la barra de búsqueda sea visible
    await driver.wait(until.elementLocated(By.css('#search-bar')), 10000);

    // Ingresar el término de búsqueda
    let searchInput = await driver.findElement(By.css('#search-bar'));
    await searchInput.sendKeys('ensalada'); // Ingresar el texto "ensalada"

    // Hacer clic en el ícono de búsqueda
    let searchIcon = await driver.findElement(By.css('#search-icon'));
    await searchIcon.click();

    // Esperar a que se cargue la nueva página (por ejemplo, detectando un cambio en la URL)
    await driver.wait(until.urlContains('/searchresult?q=ensalada'), 10000);

    // Verificar que los resultados están presentes
    await driver.wait(until.elementsLocated(By.css('.RecipeCard')), 10000); // Esperar a que aparezcan las Cards

    // Obtener las Cards y verificar su cantidad
    let recipeCards = await driver.findElements(By.css('.RecipeCard'));
    if (recipeCards.length > 0) {
      console.log(`Prueba exitosa: Se encontraron ${recipeCards.length} resultados para la búsqueda.`);
    } else {
      console.error('Prueba fallida: No se encontraron resultados.');
    }

  } catch (err) {
    console.error(`Error durante la prueba: ${err}`);
  } finally {
    // Cerrar el navegador
    await driver.quit();
  }
}

testSearch();
