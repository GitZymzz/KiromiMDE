const axios = require('axios');

async function getYtMp4(url) {
    try {
        let apiUrl = `https://api-rest-rizzkyxofc.vercel.app/api/download/ytmp4?url=${encodeURIComponent(url)}`;
        let { data } = await axios.get(apiUrl);
        
        if (!data.status) return null;

        return {
            title: data.metadata.title,
            channelTitle: data.metadata.channelTitle,
            tags: data.metadata.tags || [],
            categoryId: data.metadata.categoryId,
            description: data.metadata.localized.description,
            thumbnails: data.metadata.thumbnails,
            download: data.download.video
        };

    } catch (error) {
        console.error("Error fetching YouTube MP4:", error);
        return null;
    }
}

module.exports = { getYtMp4 };