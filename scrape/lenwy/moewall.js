/*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

const axios = require('axios');
const cheerio = require('cheerio');

async function moewalls(query = '', options = {}) {
  const defaultOptions = {
    baseUrl: 'https://moewalls.com',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  };

  const config = { ...defaultOptions, ...options };

  try {
    const searchUrl = query 
      ? `${config.baseUrl}/?s=${encodeURIComponent(query)}`
      : config.baseUrl;

    const response = await axios.get(searchUrl, {
      timeout: config.timeout,
      headers: config.headers
    });

    const $ = cheerio.load(response.data);
    const wallpapers = [];

    $('.g1-collection-item, .g1-collection-item-l, .snax-list-item').each((index, element) => {
      const $item = $(element);

      const title = $item.find('.entry-title a').text().trim();
      const thumbnail = $item.find('img').attr('src');
      const source = $item.find('.entry-title a').attr('href');

      if (!title || !source) return;

      const wallpaper = {
        title: title || 'No Title',
        thumbnail: thumbnail || 'https://i.ibb.co/G7CrCwN/404.png',
        source: source || 'No Source',
        index: index + 1,
        video: '',
      };

      wallpapers.push(wallpaper);
    });

    async function getWallpaperDetails(pageUrl) {
      try {
        const pageResponse = await axios.get(pageUrl, {
          timeout: config.timeout,
          headers: config.headers
        });
        const $page = cheerio.load(pageResponse.data);

        const video = 
          $page('video source').attr('src') || 
          $page('.snax-download-link').attr('href') ||
          $page('a.wallpaper-download-link').attr('href');

        return { video: video || 'No Video' };
      } catch (error) {
        return { video: 'Error fetching video' };
      }
    }

    for (let wallpaper of wallpapers) {
      const details = await getWallpaperDetails(wallpaper.source);
      Object.assign(wallpaper, details);
    }

    return {
      query,
      total: wallpapers.length,
      wallpapers
    };

  } catch (error) {
    return {
      query,
      total: 0,
      error: error.message,
      wallpapers: []
    };
  }
}

module.exports = moewalls;