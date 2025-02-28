const axios = require("axios");

async function tiktokScraper(url) {
    try {
        let response = await axios.get("https://api.agatz.xyz/api/tiktok", {
            params: { url: url }
        });

        let { status, data } = response.data;
        if (status !== 200 || !data.status) throw new Error("Gagal mengambil data TikTok.");

        // Cari link video tanpa watermark
        let nowatermarkVideo = data.data.find(v => v.type === "nowatermark")?.url;
        let nowatermarkHD = data.data.find(v => v.type === "nowatermark_hd")?.url;

        let result = {
            title: data.title,
            taken_at: data.taken_at,
            region: data.region,
            duration: data.duration,
            cover: data.cover,
            author: {
                fullname: data.author.fullname,
                username: data.author.nickname,
                avatar: data.author.avatar
            },
            music: {
                title: data.music_info.title,
                author: data.music_info.author,
                url: data.music_info.url
            },
            stats: {
                views: data.stats.views,
                likes: data.stats.likes,
                comments: data.stats.comment,
                shares: data.stats.share,
                downloads: data.stats.download
            },
            video: {
                nowatermark: nowatermarkVideo,
                nowatermark_hd: nowatermarkHD,
                watermark: data.data.find(v => v.type === "watermark")?.url
            }
        };

        return result;
    } catch (err) {
        console.error("TikTok Scraper Error:", err.message);
        return { error: err.message };
    }
}

module.exports = { tiktokScraper };