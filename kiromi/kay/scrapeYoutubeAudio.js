const axios = require('axios');

async function scrapeYoutubeAudio(query) {
    if (!query) throw new Error('Masukkan judul lagu!');

    const apiUrl = `https://ochinpo-helper.hf.space/yt?query=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(apiUrl);
        if (!response.data.success || !response.data.result) {
            throw new Error('Lagu tidak ditemukan.');
        }

        const video = response.data.result;

        return {
            title: video.title,
            url: video.url,
            thumbnail: video.thumbnail,
            duration: video.duration.timestamp,
            views: video.views.toLocaleString(),
            author: video.author.name,
            audioUrl: video.download.audio
        };
    } catch (error) {
        throw new Error(`Terjadi kesalahan: ${error.message}`);
    }
}

module.exports = { scrapeYoutubeAudio };