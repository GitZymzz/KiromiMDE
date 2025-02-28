const axios = require('axios');
const cheerio = require('cheerio');

async function alkitabSearch(query) {
    const url = `https://alkitab.me/search?q=${encodeURIComponent(query)}`;
    const headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
    };

    try {
        let res = await axios.get(url, { headers });
        let $ = cheerio.load(res.data);
        let results = [];

        $('div.vw').each(function () {
            let teks = $(this).find('p').text().trim();
            let link = $(this).find('a').attr('href');
            let title = $(this).find('a').text().trim();
            results.push({ teks, link, title });
        });

        return results;
    } catch (error) {
        return { error: "Gagal mengambil data dari Alkitab.me" };
    }
}

module.exports = { alkitabSearch };