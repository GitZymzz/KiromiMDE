const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function alosehat(query) {
  try {
    const url = `https://wp.hellosehat.com/?s=${encodeURIComponent(query)}`;
    const response = await fetch(url);      
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }      
    const body = await response.text();
    const $ = cheerio.load(body);      
    const articles = $(".card.article--card").map((index, element) => {
      const article = $(element);
      return {
        title: article.find("h2.entry-title a").text().trim(),
        link: article.find("h2.entry-title a").attr("href"),
        desc: article.find(".entry-summary p").text().trim(),
        author: article.find(".author.vcard a").text().trim(),
        time: article.find("time.entry-date.published").attr("datetime")
      };
    }).get().filter(article => article.title && article.desc);
  
    if (!articles.length) {
      throw new Error("No matching results found.");
    }      
    const totalResults = parseInt($(".search--result-count").text(), 10) || 0;
    return { total: totalResults, results: articles };
    
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

module.exports = alosehat;
