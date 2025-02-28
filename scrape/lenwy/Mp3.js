/*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Deskripsi: Fungsi Untuk Mengambil Hasil Download Dengan Format Mp3
  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

const axios = require('axios');

async function LenwyMp3(url) {
    let title, image, downloadUrl;
    const getDownloadData = async () => {
      try {
        const response = await axios.get(`https://api.alvianuxio.my.id/api/play`, {
          params: {
            query: url, // Menggunakan URL atau query sesuai input
            format: 'mp3',
            apikey: 'kayzuMD'
          }
        });
        console.log("API Response Data:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error in getDownloadData:", error.response ? error.response.data : error.message);
        throw new Error('⚠️ Gagal mendapatkan data unduhan');
      }
    };

    try {
      const data = await getDownloadData();
      if (data && data.data && data.data.response) {
        title = data.data.response.title;
        image = data.data.response.image;
        downloadUrl = data.data.response.downloadUrl;
        
        return JSON.stringify({
          type: 'mp3 (128 kbps)',
          title: title,
          image: image,
          download_url: downloadUrl
        });
      } else {
        throw new Error('⚠️ Data tidak valid');
      }
    } catch (error) {
      console.error("Error in Mp3 function:", error.message);
      return JSON.stringify({ error: error.message });
    }
}

module.exports = LenwyMp3;
  