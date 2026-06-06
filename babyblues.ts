import fs from 'fs';
import Bun from 'bun';
import * as cheerio from 'cheerio';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

if(!fs.existsSync('./cache')){
    fs.mkdirSync('./cache');
}

const BASE_URL = 'https://www.arcamax.com';
let url = BASE_URL + '/thefunnies/babyblues/';

for(let i = 0; i < 10; i++){
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
    let img = $('#comic-zoom');
    console.log(img.attr('src'));
    
    let prevUrl = $('.prev').first().attr('href');
    url = BASE_URL + prevUrl;
}