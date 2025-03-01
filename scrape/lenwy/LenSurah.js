/*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Deskripsi: Fungsi Untuk Mengambil Daftar Surah
  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

const axios = require('axios');
const cheerio = require('cheerio');

async function LenSurah(no) {
  try {
    const { data } = await axios.get(`https://kalam.sindonews.com/surah/${encodeURIComponent(no)}`);
    const $ = cheerio.load(data);

    const result = {
      audio: '',
      ayat: [],
      watermark: '*Response Generated By Lenwy*'
    };

    $('div.breadcrumb-new > ul > li:nth-child(5)').each((index, element) => {
      result.audio = $(element).find('a').attr('href').replace('surah', 'audioframe');
    });

    $('div.ayat-arab').each((index, element) => {
      const arab = $(element).text();
      const indo = $('li > div.ayat-text').eq(index).text().replace(',', '').trim();
      const latin = $('div.ayat-latin').eq(index).text().trim();

      result.ayat.push({
        arab,
        indo,
        latin
      });
    });

    return result;
  } catch (error) {
    throw new Error('⚠️ Terjadi Kesalahan Saat Mengambil Data Surah');
  }
}

module.exports = LenSurah;
