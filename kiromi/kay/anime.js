const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function scrapeAnimeVideos(source) {
    let url;
    if (source === "1") {
        url = 'https://shortstatusvideos.com/anime-video-status-download/';
    } else if (source === "2") {
        url = 'https://mobstatus.com/anime-whatsapp-status-video/';
    } else {
        throw '⚠️ Sumber tidak valid! Pilih 1 atau 2.';
    }

    let res = await fetch(url);
    if (!res.ok) throw '⚠️ Error saat mengambil data.';

    let html = await res.text();
    let $ = cheerio.load(html);
    let videos = [];

    $('a.mks_button.mks_button_small.squared, a.mb-button.mb-style-glass.mb-size-tiny.mb-corners-pill.mb-text-style-heavy').each((index, element) => {
        let href = $(element).attr('href');
        let title = $(element).closest('p').prevAll('p').find('strong').text() || `Anime Video ${index + 1}`;
        videos.push({ title, source: href });
    });

    if (videos.length === 0) throw '❌ Tidak ada video yang ditemukan.';

    return videos;
}

module.exports = { scrapeAnimeVideos };