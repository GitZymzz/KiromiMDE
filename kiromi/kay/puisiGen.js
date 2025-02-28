const axios = require('axios');
const qs = require('qs');

async function generatePoem(describe, length = 'Short') {
    let data = qs.stringify({
        'mode': 'Random Type',
        'describe': describe,
        'length': length
    });

    let config = {
        method: 'POST',
        url: 'https://poem-generator.io/generator/poem',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Language': 'id-ID',
            'Referer': 'https://poem-generator.io/id/pembuat-puisi',
            'X-Requested-With': 'XMLHttpRequest',
        },
        data: data
    };

    try {
        let response = await axios.request(config);
        return response.data;
    } catch (error) {
        return { error: 'Gagal membuat puisi.' };
    }
}

module.exports = { generatePoem };