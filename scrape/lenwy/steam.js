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

async function Steam(search) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status } = await axios.get('https://store.steampowered.com/search/?term=' + search);
        const $ = cheerio.load(data);
        const hasil = [];
  
        $('#search_resultsRows > a').each((a, b) => {
          const link = $(b).attr('href');
          const judul = $(b).find('div.responsive_search_name_combined > div.col.search_name.ellipsis > span').text();
          const harga = $(b).find('div.responsive_search_name_combined > div.col.search_price_discount_combined.responsive_secondrow > div.col.search_price.responsive_secondrow').text().replace(/ /g, '').replace(/\n/g, '');
          var rating = $(b).find('div.responsive_search_name_combined > div.col.search_reviewscore.responsive_secondrow > span').attr('data-tooltip-html');
          const img = $(b).find('div.col.search_capsule > img').attr('src');
          const rilis = $(b).find('div.responsive_search_name_combined > div.col.search_released.responsive_secondrow').text();
  
          if (typeof rating === 'undefined') {
            rating = 'no ratings';
          } else if (rating.split('<br>')) {
            let hhh = rating.split('<br>');
            rating = `${hhh[0]} ${hhh[1]}`;
          }
  
          hasil.push({
            judul: judul,
            img: img,
            link: link,
            rilis: rilis,
            harga: harga ? harga : 'no price',
            rating: rating
          });
        });
  
        if (hasil.every(x => x === undefined)) {
          return resolve({ response: 'no result found' });
        }
  
        resolve(hasil);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

module.exports = Steam;