const { Builder, By, until } = require('selenium-webdriver');
const { chrome } = require('selenium-webdriver/chrome');

const fs = require('fs');
const path = require('path');

async function downloadPDFTest() {
  const downloadDir = path.resolve(__dirname, 'downloads');

  const chromeOptions = {
    'goog:chromeOptions': {
      prefs: {
        'download.default_directory': downloadDir,
        'download.prompt_for_download': false,
        'plugins.always_open_pdf_externally': true,
      },
    },
  };

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

  try {
    await driver.get('http://localhost:3000/');

    await driver.wait(until.elementLocated(By.css('.RecipeCard')), 10000);
    const recipeCard = await driver.findElement(By.css('.RecipeCard'));
    await recipeCard.click();

    await driver.wait(until.urlContains('/recipes/'), 10000);

    await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Descargar PDF')]")), 10000);
    const downloadButton = await driver.findElement(By.xpath("//button[contains(., 'Descargar PDF')]"));
    await downloadButton.click();

    await driver.sleep(5000);

    const files = fs.readdirSync(downloadDir);
    const pdfFile = files.find(file => file.endsWith('.pdf'));

    if (!pdfFile) {
      throw new Error('El archivo PDF no se descargó correctamente');
    }

    console.log('downloadPDFTest Exitoso');

  } catch (err) {
    console.error(`Error durante la prueba: ${err}`);

  } finally {
    await driver.quit();
  }
}

downloadPDFTest();