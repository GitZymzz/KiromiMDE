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

const searchManga = async (query) => {
    try {
        const url = `https://westmanga.fun/?s=${encodeURIComponent(query)}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results = [];

        $('.bs .bsx').each((i, el) => {
            const title = $(el).find('.tt').text().trim();
            const chapter = $(el).find('.epxs').text().trim();
            const mangaUrl = $(el).find('a').attr('href');
            let imgUrl = $(el).find('img').attr('src');
            imgUrl = imgUrl.replace(/-\d+x\d+\.(jpg|jpeg|png)$/, '.jpg');

            results.push({ title, chapter, mangaUrl, imgUrl });
        });

        return results;
    } catch (error) {
        console.error('Error in searchManga:', error);
        return [];
    }
};

module.exports = { searchManga }