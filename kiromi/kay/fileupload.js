const axios = require('axios');
const BodyForm = require('form-data');
const fs = require('fs');

async function catboxUpload(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const formData = new BodyForm();
        formData.append('fileToUpload', fileStream);
        formData.append('reqtype', 'fileupload');
        formData.append('userhash', '');

        const response = await axios.post('https://catbox.moe/user/api.php', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error at Catbox uploader:", error);
        return "Terjadi kesalahan saat upload ke Catbox.";
    }
}

async function pomfUpload(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const formData = new BodyForm();
        formData.append('files[]', fileStream);

        const response = await axios.post('https://pomf.lain.la/upload.php', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        return response.data.files[0].url;
    } catch (error) {
        console.error("Error at Pomf uploader:", error);
        return "Terjadi kesalahan saat upload ke Pomf.";
    }
}

async function fileIoUpload(filePath) {
    try {
        const fileStream = fs.createReadStream(filePath);
        const formData = new BodyForm();
        formData.append('file', fileStream);

        const response = await axios.post('https://file.io/?expires=1d', formData, {
            headers: formData.getHeaders(),
        });

        if (response.data && response.data.success) {
            return response.data.link;
        } else {
            throw new Error('File upload failed.');
        }
    } catch (error) {
        console.error("Error at File.io uploader:", error);
        return "Terjadi kesalahan saat upload ke File.io.";
    }
}

module.exports = { catboxUpload, pomfUpload, fileIoUpload };