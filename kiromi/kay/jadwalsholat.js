const axios = require('axios');

async function scrapeJadwalSholat(kota) {
    try {
        let today = new Date();
        let tanggal = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        let url = `https://api.aladhan.com/v1/timingsByCity/${tanggal}?city=${encodeURIComponent(kota)}&country=ID&method=2`;

        let { data } = await axios.get(url);
        if (data.code !== 200) throw new Error('Gagal mengambil data dari API');

        let result = data.data.timings;
        return {
            kota,
            tanggal: data.data.date.readable,
            imsak: result.Imsak,
            subuh: result.Fajr,
            terbit: result.Sunrise,
            dzuhur: result.Dhuhr,
            ashar: result.Asr,
            maghrib: result.Maghrib,
            isya: result.Isha
        };
    } catch (error) {
        console.error('❌ Error scraping jadwal sholat:', error);
        return null;
    }
}

module.exports = { scrapeJadwalSholat };