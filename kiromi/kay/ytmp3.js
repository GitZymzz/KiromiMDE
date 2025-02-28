const axios = require('axios');

async function getYtMp3(url) {
    try {
        let apiUrl = `https://api-rest-rizzkyxofc.vercel.app/api/download/ytmp3?url=${encodeURIComponent(url)}`;
        let { data } = await axios.get(apiUrl);
        
        if (!data.status) return null;

        return {
            title: data.metadata.title,
            channelTitle: data.metadata.channelTitle,
            description: data.metadata.localized.description,
            thumbnail: data.metadata.thumbnails.high.url,
            download: data.download.audio
        };

    } catch (error) {
        console.error("Error fetching YouTube MP3:", error);
        return null;
    }
}

module.exports = { getYtMp3 };