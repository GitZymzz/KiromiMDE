const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function scrapeCosplay() {
    let url = 'https://www.zerochan.net/Cosplay';
    
    let res = await fetch(url);
    if (!res.ok) throw '⚠️ Gagal mengambil data, coba lagi nanti.';

    let html = await res.text();
    let $ = cheerio.load(html);
    let images = [];

    $('ul#thumbs2 li a img').each((index, element) => {
        let imgUrl = $(element).attr('src').replace(/\/s(.*)/, '/full$1'); // Ambil gambar ukuran full
        images.push(imgUrl);
    });

    if (images.length === 0) throw '❌ Tidak ada gambar yang ditemukan.';

    let randomImage = images[Math.floor(Math.random() * images.length)];
    
    return randomImage;
}

module.exports = { scrapeCosplay };