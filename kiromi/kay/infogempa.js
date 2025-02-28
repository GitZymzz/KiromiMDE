const axios = require('axios');

async function scrapeGempa() {
    try {
        let { data } = await axios.get('https://api.botcahx.eu.org/api/search/gempa?apikey=kayganzz');
        if (!data.status) throw new Error('Gagal mengambil data dari API');

        let result = data.result.result;
        return {
            tanggal: result.tanggal,
            jam: result.jam,
            lintang: result.Lintang,
            bujur: result.Bujur,
            magnitudo: result.Magnitudo,
            kedalaman: result.Kedalaman,
            potensi: result.Potensi,
            wilayah: result.Wilayah,
            image: result.image
        };
    } catch (error) {
        console.error('❌ Error scraping data gempa:', error);
        return null;
    }
}

module.exports = { scrapeGempa };