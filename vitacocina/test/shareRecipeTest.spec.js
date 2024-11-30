const { Builder, By, until } = require('selenium-webdriver');

async function shareRecipeTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://20.201.119.103:3000/');


        await driver.wait(until.elementLocated(By.css('.RecipeCard')), 15000);
        const recipeCards = await driver.findElements(By.css('.RecipeCard'));
        if (recipeCards.length === 0) {
            throw new Error("No recipe cards found!");
        }
        const recipeCardLink = await recipeCards[0].findElement(By.tagName('a'));
        await recipeCardLink.click();
        await driver.wait(until.urlContains('/recipes/'), 15000);

        const facebookButton = await driver.findElement(By.css('button svg[data-testid="FacebookIcon"]'));
        const twitterButton = await driver.findElement(By.css('button svg[data-testid="XIcon"]'));
        const whatsappButton = await driver.findElement(By.css('button svg[data-testid="WhatsAppIcon"]'));

        const originalWindow = await driver.getWindowHandle();

        //-------FACEBOOK TEST-------
        await facebookButton.click();
        await driver.wait(async () => (await driver.getAllWindowHandles()).length > 1, 10000, "New window not opened!");

        const windows = await driver.getAllWindowHandles();
        const newWindow = windows.find(handle => handle !== originalWindow);
        await driver.switchTo().window(newWindow);

        const facebookUrl = await driver.getCurrentUrl();
        if (!facebookUrl.includes('facebook.com/sharer')) {
            throw new Error("Facebook share URL incorrect!");
        }

        await driver.close();
        await driver.switchTo().window(originalWindow);
        console.log('Prueba de Facebook exitosa');

        //-------TWITTER TEST-------
        await twitterButton.click();
        await driver.wait(async () => (await driver.getAllWindowHandles()).length > 1, 10000, "Twitter window not opened!");
        const windowsTwitter = await driver.getAllWindowHandles();
        const twitterWindow = windowsTwitter.find(handle => handle !== originalWindow);
        await driver.switchTo().window(twitterWindow);
        const twitterUrl = await driver.getCurrentUrl();
        if (!twitterUrl.includes('x.com')) {
            throw new Error("Twitter share URL incorrect! " + twitterUrl);
        }
        await driver.close();
        await driver.switchTo().window(originalWindow);
        console.log('Prueba de Twitter exitosa');

        //-------WHATSAPP TEST-------
        await whatsappButton.click();
        await driver.wait(async () => {
            const handles = await driver.getAllWindowHandles();
            return handles.some(handle => {
                driver.switchTo().window(handle);
                return driver.getCurrentUrl().then(url => url.includes('whatsapp.com'));
            });
        }, 15000, "WhatsApp tab not found or URL doesn't contain 'whatsapp.com'!");

        await driver.switchTo().window(originalWindow);
        console.log('Prueba de Whatsapp exitosa');


        console.log('shareRecpieTest Exitoso');
    } catch (err) {
        console.error(`Error durante la prueba: ${err}`);

    } finally {
        await driver.quit();
    }
}

shareRecipeTest();