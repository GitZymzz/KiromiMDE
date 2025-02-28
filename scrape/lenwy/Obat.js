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

async function Obat(penyakit) {
    try {
        const res = await axios.get(`https://www.halodoc.com/artikel/search/${penyakit}`);
        const $ = cheerio.load(res.data);
        
        const hasil = [];
        $('.article-card.default-view').each((index, element) => {
            const judul = $(element).find('header a').text().trim();
            const tautan = `https://www.halodoc.com${$(element).find('header a').attr('href')}`;
            const deskripsi = $(element).find('.description').text().trim();
            const kategori = $(element).find('.tag-container a').map((i, el) => $(el).text().trim()).get();
            const gambar = $(element).find('.hd-base-image-mapper__img').attr('src');
            
            hasil.push({ judul, tautan, deskripsi, kategori, gambar });
        });

        return hasil;
    } catch (error) {
        console.error(`Error during Halodoc scraping: ${error.message}`);
        return `Error: ${error.message}`;
    }
}

module.exports = Obat;