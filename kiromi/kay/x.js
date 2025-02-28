const axios = require('axios');

async function xDownloader(url) {
    try {
        let apiUrl = `https://api.ryzendesu.vip/api/downloader/aiodown?url=${encodeURIComponent(url)}`;
        let { data } = await axios.get(apiUrl);

        if (!data.success || !data.quality) throw new Error('Gagal mengambil video.');

        // Ambil resolusi tertinggi (biasanya di index terakhir)
        let bestQuality = data.quality[data.quality.length - 1];

        return {
            quality: bestQuality.quality,
            url: bestQuality.url
        };
    } catch (error) {
        console.error('❌ Error X Downloader:', error.message);
        return { error: 'Terjadi kesalahan saat mengambil data.' };
    }
}

module.exports = { xDownloader };