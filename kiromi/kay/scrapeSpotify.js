const axios = require('axios');

async function scrapeSpotify(url) {
    if (!url) throw new Error('Masukkan URL Spotify!');

    const apiUrl = `https://fgsi-spotify.hf.space/?url=${encodeURIComponent(url)}`;

    try {
        const response = await axios.get(apiUrl);
        if (!response.data.status || !response.data.data) {
            throw new Error('Lagu tidak ditemukan.');
        }

        const track = response.data.data.metadata;

        return {
            title: track.title,
            artist: track.artists,
            album: track.album,
            duration: `${Math.floor(track.duration / 60000)}:${((track.duration % 60000) / 1000).toFixed(0).padStart(2, '0')}`,
            releaseDate: track.release_date,
            trackNumber: track.track_number,
            cover: track.cover_url,
            spotifyUrl: track.link,
            audioUrl: response.data.data.downloads
        };
    } catch (error) {
        throw new Error(`Terjadi kesalahan: ${error.message}`);
    }
}

module.exports = { scrapeSpotify };