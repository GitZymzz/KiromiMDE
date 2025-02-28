/*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Deskripsi: Fungsi Untuk Mengambil Respons AI
  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

const axios = require('axios');
const cheerio = require('cheerio');

async function An1(query) {
    const url = `https://an1.com/tags/MOD/?story=${encodeURIComponent(query)}&do=search&subaction=search`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const selectors = {
            nama: 'body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.name > a > span',
            rating: 'div > ul > li.current-rating',
            developer: 'body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.developer.xsmf.muted',
            thumb: 'body > div.page > div > div > div.app_list > div > div > div.img > img',
            link: 'body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.name > a'
        };

        const results = Object.keys(selectors).reduce((acc, key) => {
            acc[key] = $(selectors[key]).map((i, el) => key === 'link' ? $(el).attr('href') : $(el).text().trim()).get();
            return acc;
        }, {});

        const format = results.link.map((_, i) => ({
            judul: results.nama[i] || 'N/A',
            dev: results.developer[i] || 'N/A',
            rating: results.rating[i] || 'N/A',
            thumb: results.thumb[i] || 'N/A',
            link: results.link[i] || 'N/A'
        }));

        return {
            creator: "Lenwy",
            data: format
        };
    } catch (error) {
        throw new Error('Data retrieval failed');
    }
}

module.exports = An1;