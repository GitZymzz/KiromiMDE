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

const samehadaku = {
  searchPage: (page) => {
    return new Promise(async (resolve, reject) => {
      const baseUrl = 'https://samehadaku.email/daftar-anime-2';
      
      if (page > 18) {
        return reject({ success: false, message: 'page harus 1 sampai 18 saja!' });
      }

      let url = page === 1 
          ? `${baseUrl}/?title=&status=&type=&order=title`
          : `${baseUrl}/page/${page}/?title&status&type&order=title`;

      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const animeList = [];

        $('.animpost').each((index, element) => {
          const anime = {
            image: $(element).find('.content-thumb img').attr('src'),
            title: $(element).find('.data .title h2').text().trim(),
            rating: $(element).find('.score').text().replace('i', '').trim(),
            description: $(element).find('.stooltip .ttls').text().trim(),
            type: $(element).find('.type').first().text().trim(),
            status: $(element).find('.data .type').text().trim(),
            genres: $(element).find('.stooltip .genres .mta a').map((i, el) => $(el).text().trim()).get(),
            link: $(element).find('.animposx a').attr('href')
          };

          animeList.push(anime);
        });

        resolve(animeList);
      } catch (error) {
        reject({ success: false, message: error.message });
      }
    });
  },

  search: (query) => {
    return new Promise(async (resolve, reject) => {
      const url = 'https://samehadaku.email/?s=' + query;

      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const animeList = [];

        $('.animpost').each((index, element) => {
          const anime = {
            image: $(element).find('.content-thumb img').attr('src'),
            title: $(element).find('.data .title h2').text().trim(),
            rating: $(element).find('.score').text().replace('i', '').trim(),
            description: $(element).find('.stooltip .ttls').text().trim(),
            type: $(element).find('.type').first().text().trim(),
            status: $(element).find('.data .type').text().trim(),
            genres: $(element).find('.stooltip .genres .mta a').map((i, el) => $(el).text().trim()).get(),
            link: $(element).find('.animposx a').attr('href')
          };

          animeList.push(anime);
        });

        resolve(animeList);
      } catch (error) {
        reject({ success: false, message: error.message });
      }
    });
  },

  detail: (animeUrl) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(animeUrl);
        const $ = cheerio.load(response.data);
        const title = $('h1.entry-title').text().trim();
        const image = $('.thumb img').attr('src');
        const rating = $('.rtg span[itemprop="ratingValue"]').text().trim();
        const description = $('.entry-content-single').text().trim();
        const genres = [];
        $('.genre-info a').each((i, el) => {
          genres.push($(el).text().trim());
        });
        const episodes = [];
        $('.lstepsiode.listeps li').each((i, el) => {
          const episodeNumber = $(el).find('.epsright .eps a').text().trim();
          const episodeTitle = $(el).find('.epsleft .lchx a').text().trim();
          const episodeUrl = $(el).find('.epsleft .lchx a').attr('href');
          const episodeDate = $(el).find('.epsleft .date').text().trim();
        
          episodes.push({
            number: episodeNumber,
            title: episodeTitle,
            url: episodeUrl,
            date: episodeDate
          });
        });

        resolve({
          title,
          image,
          rating,
          description,
          genres,
          episodes
        });
      } catch (error) {
        reject({ success: false, message: error.message });
      }
    });
  },

  download: (episodeUrl) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(episodeUrl);
        const $ = cheerio.load(data);
        const title = $('.entry-title').text().trim();
        const description = $('.entry-content.entry-content-single').text().trim();
        const episodeNumber = $('.epx span[itemprop="episodeNumber"]').text().trim();
        const uploadTime = $('.time-post').text().trim();
        const downloads = [];
        
        $('.download-eps ul li').each((index, element) => {
          const quality = $(element).find('strong').text().trim();
          const links = $(element).find('span a').map((i, el) => {
            return {
              provider: $(el).text(),
              link: $(el).attr('href')
            };
          }).get();
          downloads.push({ quality, links });
        });

        const result = {
          title,
          description,
          episode: {
            number: episodeNumber,
            uploadTime
          },
          downloads
        };

        resolve(result);
      } catch (error) {
        reject({ success: false, message: error.message });
      }
    });
  }
}

module.exports = samehadaku;