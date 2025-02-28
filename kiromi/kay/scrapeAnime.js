const axios = require('axios');

async function scrapeAnime(query) {
    if (!query) throw new Error('Masukkan judul anime!');

    const apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(apiUrl);
        if (!response.data || !response.data.data || response.data.data.length === 0) {
            throw new Error('Anime tidak ditemukan.');
        }

        const anime = response.data.data[0];

        return {
            title: anime.title,
            episodes: anime.episodes || 'Tidak diketahui',
            start_date: anime.aired.from ? anime.aired.from.split('T')[0] : 'Tidak diketahui',
            end_date: anime.aired.to ? anime.aired.to.split('T')[0] : 'Masih berlangsung',
            type: anime.type || 'Tidak diketahui',
            rated: anime.rating || 'Tidak diketahui',
            score: anime.score || 'Tidak ada rating',
            members: anime.members || 'Tidak diketahui',
            synopsis: anime.synopsis || 'Tidak ada sinopsis.',
            image_url: anime.images.jpg.image_url,
            url: anime.url
        };
    } catch (error) {
        throw new Error(`Terjadi kesalahan: ${error.message}`);
    }
}

module.exports = { scrapeAnime };