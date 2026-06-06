import fs from 'fs';
import * as cheerio from 'cheerio';

// Source - https://stackoverflow.com/a/39914235
// Posted by Dan Dascalescu, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-06, License - CC BY-SA 4.0

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

if(!fs.existsSync('./cache')){
    fs.mkdirSync('./cache');
}

for(let i = 3216; i>3206; i--){
    let html ='';
    if(fs.existsSync(`./cache/${i}.html`)){
        html = fs.readFileSync(`./cache/${i}.html`, {encoding: 'utf-8'});
    } else {
        await sleep(1000);
        let res = await fetch(`https://xkcd.com/${i}/`);
        html = await res.text();
        fs.writeFileSync(`./cache/${i}.html`, html);
    }
    const $ = cheerio.load(html);
    let img = $('#comic>img');
    console.log(img.attr('src'));
    console.log(img.attr('title'));
    console.log(img.attr('alt'));
}