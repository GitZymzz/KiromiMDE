const axios = require('axios');
const cheerio = require('cheerio');

  async function Zerochan(query) {
    const url = `https://www.zerochan.net/search?q=${encodeURIComponent(query)}`;
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const imageUrls = [];
      
      $('.thumb img').each((index, element) => {
        const imgUrl = $(element).attr('data-src') || $(element).attr('src');
        if (imgUrl) {
          imageUrls.push(imgUrl);
        }
      });

      return imageUrls;
    } catch (error) {
      console.error('Error fetching Zerochan data:', error.message);
      throw new Error('Failed to fetch images from Zerochan');
    }
  }

module.exports = Zerochan;