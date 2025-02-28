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

  async function WikiMedia(title) {
    return new Promise((resolve, reject) => {
      axios.get(`https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(title)}&title=Special:MediaSearch&go=Go&type=image`)
        .then((res) => {
          const $ = cheerio.load(res.data);
          let hasil = [];

          $('.sdms-search-results__list-wrapper > div > a').each(function (a, b) {
            hasil.push({
              title: $(b).find('img').attr('alt'),
              source: 'https://commons.wikimedia.org' + $(b).attr('href'),
              image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src'),
            });
          });

          resolve(hasil);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

module.exports = WikiMedia;