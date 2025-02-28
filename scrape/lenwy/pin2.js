const axios = require('axios');

async function pin2(text) {
    try {
        let response = await axios.get(`https://api.tioo.eu.org/download/pindl?url=${encodeURIComponent(text)}`);
        console.log(response.data); // Log untuk melihat data API

        let data = response.data;

        // Cek apakah data ada atau tidak
        if (!data.result || !data.result.image) {
            throw new Error('Gambar tidak ditemukan!');
        }

        let imgSrc = data.result.image;

        return {
            creator: 'Jikarinka',
            imgSrc: imgSrc
        };

    } catch (error) {
        console.error('Error:', error.message);
        return {
            creator: 'Jikarinka',
            imgSrc: [],
            error: 'Gagal mengambil data. Pastikan URL benar atau server dapat diakses.'
        };
    }
}

// Ekspor fungsi pin2
module.exports = { pin2 }