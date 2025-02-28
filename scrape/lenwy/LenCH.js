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

async function SaluranWa(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const img = $('img._9vx6').attr('src');
    const name = $('h3._9vd5._9t2_').text().trim();
    const follow = $('h5._9vd5._9scy').text().trim();
    const followerMatch = follow.match(/([\d.]+)K?/);
    const follower = followerMatch 
      ? (followerMatch[1].includes('.') ? parseFloat(followerMatch[1]) * 1000 : parseInt(followerMatch[1]))
      : "Tidak Diketahui";
    
    const description = $('h4._9vd5._9scb').text().trim();
    const link = $('a#action-button').attr('href');

    return {
      img,
      name,
      follower,
      description,
      link
    };
  } catch (error) {
    console.error('⚠ Link Tidak Dikenali :', error);
    return null;
  }
}

module.exports = SaluranWa;
