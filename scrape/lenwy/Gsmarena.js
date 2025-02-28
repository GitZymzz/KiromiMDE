/*  

  Made By kayzuMD
  Base : kayzu
  WhatsApp : wa.me/6289673462138
  Telegram : t.me/kayzuMD
  Youtube : @kayzuhosting

  Channel : https://whatsapp.com/channel/0029VatjTeULo4hk0RJlly0V

  Copy Code?, Recode?, Rename?, Reupload?, Reseller? Taruh Credit Ya :D
  
  Deskripsi: Fungsi untuk Mencari Informasi Perangkat di GSMArena
  Mohon Untuk Tidak Menghapus Watermark Di Dalam Kode Ini
*/

const axios = require("axios");
const cheerio = require("cheerio");

async function GSM(query) {
    const url = `https://gsmarena.com/results.php3?sQuickSearch=yes&sName=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.0.0 Safari/537.36"
            }
        });

        if (response.status !== 200) {
            throw new Error(`Error: ${response.status}`);
        }

        const $ = cheerio.load(response.data);
        const result = [];

        $(".makers li").each((i, element) => {
            const img = $(element).find("img");
            result.push({
                id: $(element).find("a").attr("href").replace(".php", ""),
                name: $(element).find("span").html().split("<br>").join(" "),
                description: img.attr("title")
            });
        });

        return result;
    } catch (error) {
        console.error("Fetch error:", error.message);
        throw error;
    }
}

module.exports = GSM;