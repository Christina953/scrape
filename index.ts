import * as cheerio from 'cheerio';

let res = await fetch('https://xkcd.com/3253/');
let html = await res.text();
const $ = cheerio.load(html);
let img = $('#comic>img');
console.log(img.attr('src'));
console.log(img.attr('title'));
console.log(img.attr('alt'));