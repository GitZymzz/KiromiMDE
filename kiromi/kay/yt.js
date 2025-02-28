const axios = require("axios");

async function youtubeScraper(url) {
    try {
        let response = await axios.get(`https://api.betabotz.eu.org/api/download/ytmp4?url=${url}&apikey=PXYo4sxf`);

        let { status, result } = response.data;
        if (!status || !result) {
            throw new Error("Gagal mengambil data YouTube.");
        }

        // Mengambil data metadata video
        let metadata = result;
        
        let resultData = {
            title: metadata.title,
            description: metadata.description,
            duration: metadata.duration, // Durasi video
            author: metadata.creator, // Penulis video
            source: metadata.source, // Link sumber (URL video)
            thumb: metadata.thumb, // Thumbnail video
            quality: "Available qualities: 144p, 360p, 480p, 720p, 1080p", // Menambahkan keterangan kualitas (dapat ditambahkan kualifikasi lebih lanjut jika tersedia)
            mp4: metadata.mp4, // Link download video
            mp3: metadata.mp3 // Link download audio (MP3)
        };

        return resultData;
    } catch (err) {
        console.error("YouTube Scraper Error:", err.message);
        return { error: err.message };
    }
}

module.exports = { youtubeScraper };