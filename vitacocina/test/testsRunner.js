const { exec } = require('child_process');

const testFiles = [
  'clickRecipeTitleTest.spec.js',
  'clickTipsTitleTest.spec.js',
  'deleteRecipeTest.spec.js',
  'downloadPDFTest.spec.js',
  'loginTest.spec.js',
  'recipeCardClickTest.spec.js',
  'shareRecipeTest.spec.js',
  'testSearch.spec.js',
  'tipsCardClickTest.spec.js'
];

testFiles.forEach((file) => {
  exec(`node ${file}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ejecutando ${file}:`, error.message);
      return;
    }
    if (stderr) {
      console.error(`Stderr de ${file}:`, stderr);
      return;
    }
    console.log(`Resultado de ${file}:\n${stdout}`);
  });
});