const crypto = require("crypto");
const axios = require("axios");

function generateHash(input) {
    return crypto.createHash('sha1').update(input).digest('hex');
}

async function pixivScraper(query) {
    try {
        let hash = generateHash(query);
        let { data } = await axios.get(`https://pixiv.net/touch/ajax/tag_portal?word=${encodeURIComponent(query)}&lang=id&version=${hash}`);

        if (!data.body) return { status: false, message: "Gagal mengambil data, coba lagi nanti." };

        return { status: true, results: data.body };
    } catch (error) {
        console.error("Error scraping:", error.message);
        return { status: false, message: "Terjadi kesalahan, coba lagi nanti." };
    }
}

module.exports = { pixivScraper };