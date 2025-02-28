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

const https = require('https');
const cheerio = require('cheerio');

  async function RuangMovie(query) {
    return new Promise((resolve, reject) => {
      const url = `https://ruangmoviez.my.id/?s=${encodeURIComponent(query)}`;

      https.get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          const $ = cheerio.load(data);
          const movies = [];

          $('article.item-infinite').each((index, element) => {
            const movie = {
              link: $(element).find('a[itemprop="url"]').attr('href'),
              title: $(element).find('h2.entry-title a').text(),
              relTag: $(element).find('a[rel="category tag"]').map((i, el) => $(el).text()).get(),
            };
            movies.push(movie);
          });

          resolve({
            status: 200,
            creator: "Lenwy",
            result: movies
          });
        });

      }).on("error", (err) => {
        resolve({
          status: 404,
          msg: err.message
        });
      });
    });
  }

module.exports = RuangMovie;