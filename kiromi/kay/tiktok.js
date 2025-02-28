const axios = require("axios");
const cheerio = require("cheerio");

async function tiktokScraper(url) {
    const apiUrl = "https://ttsave.app/download";
    const headers = {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0",
        "Referer": "https://ttsave.app/id"
    };

    const data = { query: url, language_id: "2" };

    try {
        const response = await axios.post(apiUrl, data, { headers });
        const html = response.data;
        return extractData(html);
    } catch (error) {
        console.error("TikTok Scraper Error:", error.message);
        return { error: "Gagal mengambil data dari TikTok." };
    }
}

function extractData(html) {
    const $ = cheerio.load(html);
    return {
        username: $("h2.font-extrabold").text().trim(),
        userHandle: $("a[title]").text().trim(),
        description: $("p.oneliner").text().trim(),
        downloadLinks: {
            video: $("a[type='no-watermark']").attr("href") || $("a[type='watermark']").attr("href"),
            image: $("a[type='cover']").attr("href"),
            audio: $("a[type='audio']").attr("href")
        }
    };
}

module.exports = { tiktokScraper };