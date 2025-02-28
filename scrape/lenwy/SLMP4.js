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

async function LenwyMp4(url) {
    let title, image;

    const getDownloadId = async () => {
      try {
        const response = await axios.get(`https://ab.cococococ.com/ajax/download.php?copyright=0&format=360&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`);
        return response.data;
      } catch (error) {
        throw new Error('Gagal mendapatkan ID unduhan');
      }
    };

    const checkProgress = async (id) => {
      try {
        const response = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`);
        return response.data;
      } catch (error) {
        throw new Error('Gagal memeriksa progres unduhan');
      }
    };

    const pollProgress = async (id) => {
      try {
        const data = await checkProgress(id);
        if (data.progress === 1000) {
          return {
            type: 'mp4 (360p)',
            title: title,
            image: image,
            download_url: data.download_url
          };
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Tunggu 1 detik
          return pollProgress(id);
        }
      } catch (error) {
        throw error;
      }
    };

    const data = await getDownloadId();
    if (data.success && data.id) {
      title = data.info.title;
      image = data.info.image;
      return pollProgress(data.id);
    } else {
      throw new Error('Gagal mendapatkan ID unduhan');
    }
  }

module.exports = LenwyMp4;