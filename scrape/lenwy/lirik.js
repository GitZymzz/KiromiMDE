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

async function SongLyrics(query) {
    try {
        const response = await axios.get(`http://song-lyrics-api-o0m8tth8t-azharimm.vercel.app/search?q=${query}`);
        const result = response.data;

        if (result.status && result.data) {
            return result.data.map(song => ({
                songId: song.songId,
                artist: song.artist,
                songTitle: song.songTitle,
                songLyricsUrl: song.songLyrics
            }));
        } else {
            return 'No results found';
        }
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }
}

module.exports = SongLyrics;
