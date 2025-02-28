const axios = require("axios");

async function facebookScraper(url) {
    try {
        let response = await axios.get(`https://api.ryzendesu.vip/api/downloader/fbdl?url=${encodeURIComponent(url)}`);
        let { status, data } = response.data;

        if (!status || !data || data.length === 0) {
            throw new Error("Gagal mengambil data dari Facebook.");
        }

        let videoData = data[0]; // Pilih video pertama dari resolusi yang tersedia
        let result = {
            videoUrl: videoData.url // Ambil hanya URL video
        };

        return result;
    } catch (err) {
        console.error("Facebook Scraper Error:", err.message);
        return { error: err.message };
    }
}

module.exports = { facebookScraper };