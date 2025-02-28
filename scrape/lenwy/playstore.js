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

  async function PlayStore(search) {
    try {
      const { data } = await axios.get(`https://play.google.com/store/search?q=${encodeURIComponent(search)}&c=apps`);
      
      const hasil = [];
      const $ = cheerio.load(data);
      
      $('.ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a').each((i, u) => {
        const linkk = $(u).attr('href');
        const nama = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .DdYX5').text();
        const developer = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb').text();
        const img = $(u).find('.j2FCNc > img').attr('src');
        const rate = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div').attr('aria-label');
        const rate2 = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF').text();
        const link = `https://play.google.com${linkk}`;

        hasil.push({
          link: link,
          nama: nama || 'No name',
          developer: developer || 'No Developer',
          img: img || 'https://i.ibb.co/G7CrCwN/404.png',
          rate: rate || 'No Rate',
          rate2: rate2 || 'No Rate',
          link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join('+')}`
        });
      });

      return hasil;
    } catch (error) {
      console.error('Error fetching data from Play Store:', error);
      throw error;
    }
  }

module.exports = PlayStore;