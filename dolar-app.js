const puper = require("puppeteer");
const path = require("path");
const fs = require("fs");
const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota'
});
console.log(nDate);

(async() => {

    console.log("APP Node APi Dolar - rooms - crbs")
    const browser = await puper.launch({
        headless: true,
        slowMo: 300
    })

    console.log("Empezando  Dolar Web ... v1");
    const page = await browser.newPage();
    await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    await page.goto("https://dolar.wilkinsonpc.com.co/");
    await page.waitForSelector('.tabla_links_foot_td_network');
    await page.waitForTimeout(300);

    const dolar = await page.evaluate(() => {
        const dolar_str = document.querySelector(".valor").innerText;
        const dolar_proy = document.querySelector("#indicador_vigente > div > div.valor > span.numero.promedio").innerText;
        const dolar = document.querySelector(".valor").innerText.replace(/[^0-9]/g, "").substring(0, 4);
        const date = 'Date';
        return {
            dolar_str,
            dolar,
            dolar_proy,
            date
        };

    });
    console.log("Finish !  " + dolar.dolar_str);
    await browser.close(); //cerramos los browser ..
    const data = JSON.stringify(dolar);
    fs.writeFileSync(path.join(__dirname, "dolar.json"), data);
    console.log("Create dolar json x.x")

})();