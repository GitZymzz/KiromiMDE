const axios = require('axios');
const cheerio = require('cheerio');

async function FFW() {
    try {
        const ress = await axios.get(`https://ff.garena.com/id/weapons/`);
        const $ = cheerio.load(ress.data);
        
        const daftarSenjata = [];
        
        $('.weapon-card').each((index, element) => {
            const namaSenjata = $(element).find('.title-wrap span').text().trim();
            const damage = $(element).find('.damage-level').text().trim();
            const deskripsi = $(element).find('.abstract').text().trim();
            const tags = [];
            
            $(element).find('.tags-wrap .weapon-tag').each((i, tagElement) => {
                tags.push($(tagElement).text().trim());
            });

            daftarSenjata.push({
                name: namaSenjata,
                damage: damage,
                description: deskripsi,
                tags: tags,
            });
        });

        return daftarSenjata;
    } catch (error) {
        console.error("Kesalahan saat mengambil informasi senjata:", error);
        return `Error: ${error.message}`;
    }
}

module.exports = FFW;