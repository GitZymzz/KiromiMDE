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

async function IMDB(title) {
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${title}&plot=full`);
        const movie = response.data;

        if (movie.Response === "True") {
            return {
                title: movie.Title,
                year: movie.Year,
                rated: movie.Rated,
                released: movie.Released,
                runtime: movie.Runtime,
                genre: movie.Genre,
                director: movie.Director,
                writer: movie.Writer,
                actors: movie.Actors,
                plot: movie.Plot,
                language: movie.Language,
                country: movie.Country,
                awards: movie.Awards,
                poster: movie.Poster,
                ratings: movie.Ratings.map(rating => ({
                    source: rating.Source,
                    value: rating.Value
                })),
                imdbRating: movie.imdbRating,
                imdbVotes: movie.imdbVotes,
                imdbID: movie.imdbID,
                type: movie.Type,
                boxOffice: movie.BoxOffice,
                production: movie.Production,
                website: movie.Website
            };
        } else {
            return 'Movie not found';
        }
    } catch (err) {
        throw new Error(`Error: ${err.message}`);
    }
}

module.exports = IMDB;