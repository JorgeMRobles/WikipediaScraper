const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')();
const path = require('path');

// Obtener el artículo que el usuario desea buscar
const article = prompt('Ingrese el artículo de Wikipedia que desea buscar: ');
console.log(`Artículo a buscar: ${article}`);

(async () => {
  // Ruta absoluta al directorio donde se encuentra el script
  const scriptDirectory = path.resolve(__dirname);

  // Iniciar una instancia de navegador headless
  const browser = await puppeteer.launch({ headless: "new" });

  // Abrir una nueva página
  const page = await browser.newPage();

  // URL de la página principal de Wikipedia
  const wikipediaURL = 'https://es.wikipedia.org/wiki/Portada';

  // Capturar la página de Wikipedia antes de la búsqueda
  await page.goto(wikipediaURL);
  await page.screenshot({ path: path.join(scriptDirectory, 'before_search.png') });

  // Ir a la página de búsqueda de Wikipedia y buscar el artículo
  await page.goto(`https://es.wikipedia.org/wiki/Especial:Buscar?search=${encodeURIComponent(article)}`);

  // Capturar la página de Wikipedia después de la búsqueda
  await page.screenshot({ path: path.join(scriptDirectory, 'after_search.png') });

  // Capturar el PDF del artículo después de la búsqueda
  await page.pdf({ path: path.join(scriptDirectory, 'article.pdf'), format: 'A4' });

  // Cerrar el navegador
  await browser.close();

  console.log('Búsqueda completa. Las capturas de pantalla se han guardado como before_search.png y after_search.png. El artículo se ha guardado como article.pdf.');
})();