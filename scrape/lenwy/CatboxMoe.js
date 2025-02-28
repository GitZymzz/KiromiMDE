/*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D

  Deskripsi: Fungsi Untuk Mengambil Respons AI
Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini

*/

const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

async function CatboxMoe(input) {
    try {
        const form = new FormData();
        form.append("fileToUpload", fs.createReadStream(input));
        form.append("reqtype", "fileupload");

        const res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: form,
        });

        const data = await res.text();
        return data;
    } catch (e) {
        console.error('Error:', e.message);
        throw e;
    }
}

module.exports = CatboxMoe