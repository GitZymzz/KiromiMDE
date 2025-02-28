const axios = require("axios");

async function instagramScraper(url) {
    try {
        let response = await axios.get("https://api.agatz.xyz/api/instagram", {
            params: { url: url }
        });

        let { status, data } = response.data;
        if (status !== 200 || !data || !data.videoLinks || data.videoLinks.length === 0) {
            throw new Error("Gagal mengambil data Instagram.");
        }

        // Mengambil data video
        let video = data.videoLinks[0];

        let result = {
            title: data.title,
            description: data.description,
            video: {
                quality: video.quality.trim(),
                url: video.url
            }
        };

        return result;
    } catch (err) {
        console.error("Instagram Scraper Error:", err.message);
        return { error: err.message };
    }
}

module.exports = { instagramScraper };