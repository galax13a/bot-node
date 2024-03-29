const puper = require("puppeteer");
const path = require("path");
const fs = require("fs");

let con, date;
con = 0;
console.log("Script 1 ******** Starting******")
    //setInterval(carga, 100000);
carga();
console.log("****  Dolar Web ... v1.0");

async function carga() {

    con++;
    console.log("load*********** " + con);
    date = await get_hr();
    console.log(date);
    await get_dolar();
}

async function get_hr() {
    nDate = new Date().toLocaleString('en-US', {
        timeZone: 'America/Bogota'
    });

    return nDate;
}

async function get_dolar() {
    // console.log("APP Node APi Dolar - rooms cb")
    date = await get_hr();
    console.log("Start  *** Scripting ************  " + date);
    const browser = await puper.launch({
        headless: true,
        slowMo: 1200,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=egl']
    })

    try {
        const page = await browser.newPage();
        await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
        await page.goto("https://dolar.wilkinsonpc.com.co/");
        await page.waitForSelector('.tabla_links_foot_td_network');
        await page.waitForTimeout(900);
        console.log("Evaluate Page Dolar")
        let dolar = new Array();
        dolar = { "nissan": "sentra", "color": "green" };
        dolar = await page.evaluate(() => {
            const dolar_str = document.querySelector(".valor").innerText;
            const dolar_proy = document.querySelector("#indicador_vigente > div > div.valor > span.numero.promedio").innerText;
            const dolar = document.querySelector(".valor").innerText.replace(/[^0-9]/g, "").substring(0, 4);
            const date = '20-20-26'
            return {
                dolar_str,
                dolar,
                dolar_proy,
                date
            };

        });

        console.log("Finish DOLAR API  ****************************** " + dolar.dolar_str);
        await browser.close(); //cerramos los browser ..
        let datos2 = new Array();

        datos2.push({ "nissan": "sentra", "color": "green" })

        //datos = JSON.stringify(dolar);
        datos = JSON.stringify(dolar);
        fs.writeFileSync(path.join(__dirname, "dolar.json"), datos);

        let rawdata2 = fs.readFileSync('dolar.json');
        let dolar_json2 = JSON.parse(rawdata2);
        dolar_json2.date = await get_hr()

        //console.log(" fecha decha fecha " + dolar_json2.date)

        datos = JSON.stringify(dolar_json2);
        fs.writeFileSync(path.join(__dirname, "dolar.json"), datos); // save 2

        date = await get_hr();
        console.log("Finish *** Script **** " + date);
        process.exit();

    } catch (error) {
        console.log(error);

    }
}