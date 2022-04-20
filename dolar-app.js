const puper = require("puppeteer");
const path = require("path");
const fs = require("fs");
const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota'
});
console.log(nDate);
let con;
con = 1;
setInterval(carga, 30000);
async function carga() {
    con++;
    console.log("carga con " + con);
}

(async() => {

    console.log("APP Node APi Dolar - rooms - crbs")
    const browser = await puper.launch({
        headless: true,
        slowMo: 1000,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=egl']
    })

    console.log("****  Dolar Web ... v1.0");
    const page = await browser.newPage();
    await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    await page.goto("https://dolar.wilkinsonpc.com.co/");
    await page.waitForSelector('.tabla_links_foot_td_network');
    await page.waitForTimeout(300);
    console.log("Evaluate Page Dolar")
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
    console.log("Finish dolar!  " + dolar.dolar_str);
    await browser.close(); //cerramos los browser ..
    const data = JSON.stringify(dolar);
    fs.writeFileSync(path.join(__dirname, "dolar.json"), data);
    console.log("Create dolar json x.x")

    let rawdata = fs.readFileSync('dolar.json');
    let dolar_json = JSON.parse(rawdata);
    console.log(dolar_json);



})();