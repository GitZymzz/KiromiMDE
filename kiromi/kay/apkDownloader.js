const fetch = require('node-fetch');

const apkDownloader = async (apkId) => {
    try {
        const response = await fetch(`https://vihangayt.me/download/apk?id=${encodeURIComponent(apkId)}`);
        const data = await response.json();

        if (!data.status) throw new Error('APK tidak ditemukan');

        const apkData = data.data;
        return {
            name: apkData.name,
            lastUpdate: apkData.lastup,
            package: apkData.package,
            size: apkData.size,
            icon: apkData.icon,
            downloadLink: apkData.dllink
        };
    } catch (error) {
        console.error('❌ Error APK Downloader:', error.message);
        return { error: 'Terjadi kesalahan saat mengambil data APK.' };
    }
};

module.exports = { apkDownloader };