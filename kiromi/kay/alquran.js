const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function alquran(surah, ayat) {
    let url = `https://kalam.sindonews.com/ayat/${ayat}/${surah}`;
    let res = await fetch(url);
    
    if (!res.ok) throw '⚠️ Error, mungkin surah atau ayat tidak ditemukan.';
    
    let $ = cheerio.load(await res.text());
    let content = $('body > main > div > div.content.clearfix > div.news > section > div.list-content.clearfix');
    
    let Surah = $(content).find('div.ayat-title > h1').text();
    let arab = $(content).find('div.ayat-detail > div.ayat-arab').text();
    let latin = $(content).find('div.ayat-detail > div.ayat-latin').text();
    let terjemahan = $(content).find('div.ayat-detail > div.ayat-detail-text').text();
    
    let tafsir = '';
    $(content).find('div.ayat-detail > div.tafsir-box > div').each(function () {
        tafsir += $(this).text() + '\n';
    });
    
    let keterangan = $(content).find('div.ayat-detail > div.ayat-summary').text();
    
    let audio = `https://quran.kemenag.go.id/cmsq/source/s01/${surah.toString().padStart(3, '0')}${ayat.toString().padStart(3, '0')}.mp3`;

    return {
        surah: Surah,
        arab,
        latin,
        terjemahan,
        tafsir: tafsir.trim(),
        audio,
        keterangan
    };
}

module.exports = { alquran };