const axios = require("axios");
const cheerio = require("cheerio");

async function getRandomArticle() {
    try {
        let url = "https://rumahmisteri.com/";
        let { data } = await axios.get(url);
        let $ = cheerio.load(data);
        let articles = [];

        $(".archive-grid-post-wrapper article").each((i, el) => {
            let title = $(el).find("h2.entry-title a").text().trim();
            let link = $(el).find("h2.entry-title a").attr("href");
            let image = $(el).find(".post-thumbnail img").attr("src");
            let category = $(el).find(".post-cats-list a").text().trim();
            let date = $(el).find(".posted-on time").attr("datetime");

            if (title && link) {
                articles.push({ title, link, image, category, date });
            }
        });

        if (articles.length === 0) {
            return { error: "❌ Tidak ada artikel yang ditemukan." };
        }

        let randomArticle = articles[Math.floor(Math.random() * articles.length)];
        return randomArticle;
    } catch (error) {
        console.error("❌ Error Rumah Misteri:", error.message);
        return { error: "❌ Terjadi kesalahan saat mengambil data." };
    }
}

module.exports = { getRandomArticle };