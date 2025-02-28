/*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Deskripsi: Fungsi Untuk Mengambil Jadwal Sholat
  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

const axios = require('axios');
const cheerio = require('cheerio');

async function LenwyJadwalSholat(city) {
    try {
      const url = `https://umrotix.com/jadwal-sholat/${encodeURIComponent(city)}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const result = {};
  
      // Mendapatkan nama kota
      result.kota = $("h1.text-center")
        .first()
        .text()
        .replace("Jadwal Sholat ", "")
        .trim();
  
      // Mendapatkan jadwal sholat dan tanggal
      $("body > div > div.main-wrapper.scrollspy-action > div:nth-child(3)").each(function (a, b) {
        result.tanggal = $(b).find("> div:nth-child(2)").text();
  
        result.jadwal = {
          imsak: $(b).find("> div.panel.daily > div > div > div > div > div:nth-child(1) > p:nth-child(2)").text(),
          subuh: $(b).find("> div.panel.daily > div > div > div > div > div:nth-child(2) > p:nth-child(2)").text(),
          dzuhur: $(b).find("> div.panel.daily > div > div > div > div > div:nth-child(3) > p:nth-child(2)").text(),
          ashar: $(b).find("> div.panel.daily > div > div > div > div > div:nth-child(4) > p:nth-child(2)").text(),
          maghrib: $(b).find("> div.panel.daily > div > div > div > div > div:nth-child(5) > p:nth-child(2)").text(),
          isyak: $(b).find("> div.panel.daily > div > div > div > div > div:nth-child(6) > p:nth-child(2)").text(),
        };
      });
  
      return JSON.stringify(result);
    } catch (error) {
      console.error('Error:', error);
      return "⚠️ Terjadi kesalahan saat mengambil jadwal sholat.";
    }
  }  

module.exports = LenwyJadwalSholat;