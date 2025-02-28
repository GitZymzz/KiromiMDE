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

async function release() {
  try {
    const { data } = await axios.get('https://m.21cineplex.com/index.php', {
      params: { sid: '' },
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    const $ = cheerio.load(data);

    const hasil = [];
    $('.grid_movie').each((_, element) => {
      const $el = $(element);
      hasil.push({
        id: $el.find('img').attr('id'),
        title: $el.find('.title').text().trim(),
        image: $el.find('img').attr('src'),
        type: $el.find('.btn-group-sm span').first().text().trim(),
        rating: $el.find('.btn-group-sm a').text().trim(),
        advanceTicketSales: $el.find('span[style="color:red; font-size:9px; margin-top:5px"]').text().trim(),
        detailsLink: `https://m.21cineplex.com/${$el.find('a').first().attr('href')}`
      });
    });

    return hasil;
  } catch (error) {
    return {
      error: true,
      message: error.message,
      details: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : null
    };
  }
}

async function detail(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const movieDetails = {
      title: $('.panel-heading .col-xs-8').first().text().trim(),
      genre: $('.panel-heading .col-xs-8').eq(1).text().trim(),
      poster: $('.col-md-3 img').attr('src'),
      duration: $('p:contains("Minutes")').text().trim(),
      format: $('.btn-default').text().trim(),
      description: $('#description').text().trim(),
      producer: $('p:contains("Producer")').next('p').text().trim(),
      director: $('p:contains("Director")').next('p').text().trim(),
      writer: $('p:contains("Writer")').next('p').text().trim(),
      cast: $('p:contains("Cast")').next('p').text().trim(),
      distributor: $('p:contains("Distributor")').next('p').text().trim(),
      trailers: $('button:contains("TRAILER")').attr('onclick')?.replace("location.href = '", '').replace("';", '')
    };

    return movieDetails;
  } catch (error) {
    console.error('Error scraping movie details:', error);
    return null;
  }
}

module.exports = { release, detail };