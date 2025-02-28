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

  async function webtoons(query) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.webtoons.com/id/search?keyword=${encodeURIComponent(query)}`)
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const hasil = [];
          
          $('#content > div.card_wrap.search._searchResult > ul > li').each((a, b) => {
            const result = {
              status: 200,
              judul: $(b).find('> a > div > p.subj').text(),
              like: $(b).find('> a > div > p.grade_area > em').text(),
              creator: $(b).find('> a > div > p.author').text(),
              genre: $(b).find('> a > span').text(),
              thumbnail: $(b).find('> a > img').attr('src'),
              url: $(b).find('> a').attr('href')
            };
            hasil.push(result);
          });

          resolve(hasil);
        })
        .catch(reject);
    });
  }

module.exports = webtoons;