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

async function YahooImg(query) {
  try {
    const url = `https://images.search.yahoo.com/search/images?p=${encodeURIComponent(query)}&ei=UTF-8`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let result = [];

    $("div.sres-cntr ul#sres > li").each((index, element) => {
      const imageData = JSON.parse($(element).attr("data"));
      if (imageData) {
        result.push({
          title: imageData.alt || "No title",
          size: imageData.s,
          width: imageData.w,
          height: imageData.h,
          url: imageData.iurl,
        });
      }
    });

    return result;
  } catch (error) {
    throw new Error(`Error fetching image data: ${error.message}`);
  }
}

module.exports = YahooImg;