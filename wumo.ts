import fs from 'fs';
import Bun from 'bun';
import * as cheerio from 'cheerio';

// Source - https://stackoverflow.com/a/39914235
// Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-06, License - CC BY-SA 4.0

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

if(!fs.existsSync('./cache')){
    fs.mkdirSync('./cache');
}

const BASE_URL = 'https://wumo.com';
let url = BASE_URL + `/wumo`;
for(let i = 0; i<10; i++){
    let html = '';
    const cacheFile = `./cache/` + Bun.hash(url) + '.html';
    if(fs.existsSync(cacheFile)) {
        html = fs.readFileSync(cacheFile, {encoding: 'utf-8'});
    } else {
        await sleep(1000);
        let res = await fetch(url);
        html = await res.text();
        fs.writeFileSync(cacheFile, html);
    }
    const $ = cheerio.load(html);
    let img = $('.box-content>a>img').first();

    console.log(BASE_URL + img.attr('src'));
    console.log(img.attr('alt'));
    let prevUrl = $('.prev').first().attr('href');
    url = BASE_URL + prevUrl;
    console.log(prevUrl);
    }
