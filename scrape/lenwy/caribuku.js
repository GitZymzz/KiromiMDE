/*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

const axios = require('axios');
const cheerio = require('cheerio');

async function Lenread(query) {
    const url = `https://www.goodreads.com/search?q=${encodeURIComponent(query)}`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const books = [];
        $('.tableList tr').each((index, element) => {
            const title = $(element).find('a.bookTitle span').text().trim();
            const link = $(element).find('a.bookTitle').attr('href');
            const rating = $(element).find('span.minirating').text().trim();
            books.push({ title, link: `https://www.goodreads.com${link}`, rating });
        });
        return books;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return [];
    }
}

module.exports = Lenread;

