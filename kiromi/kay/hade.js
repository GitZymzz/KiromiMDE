const Jimp = require('jimp');

async function enhanceImage(media) {
    try {
        // Load gambar dengan Jimp
        const image = await Jimp.read(media);

        // Perbesar resolusi 4x dari ukuran asli
        image.resize(image.bitmap.width * 2, image.bitmap.height * 2);

        // Simpan hasil ke buffer
        return await image.getBufferAsync(Jimp.MIME_JPEG);
    } catch (error) {
        console.error('Error enhancing image:', error.message);
        return null;
    }
}

module.exports = { enhanceImage };