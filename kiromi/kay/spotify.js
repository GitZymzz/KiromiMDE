const axios = require("axios");

async function spotifyScraper(query) {
    try {
        let response = await axios.get(`http://kinchan.sytes.net/spotify?query=${encodeURIComponent(query)}`);
        let data = response.data;

        if (!data.status || !data.result || !data.audio || !data.audio.url) {
            throw new Error(data.msg || "Gagal mengambil data Spotify.");
        }

        return {
            title: data.result.title,
            artist: data.result.artist,
            duration: data.result.duration,
            popularity: data.result.popularity,
            preview: data.result.preview || "Tidak tersedia",
            thumbnail: data.result.thumbnail,
            spotifyUrl: data.result.url,
            audioUrl: data.audio.url
        };
    } catch (err) {
        console.error("Spotify Scraper Error:", err.message);
        return { error: err.message };
    }
}

module.exports = { spotifyScraper };