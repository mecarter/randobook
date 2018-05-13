const fetch = require('node-fetch');
const convert = require('xml-js');
const querystring = require('query-string');
const oauth = require('./oauth');

const goodreads = {
  fetchGoodreadsData: (session) => {
    const params = querystring.stringify({
      key: process.env.GOODREADS_KEY,
      shelf: 'to-read',
      id: session.goodreads.userid,
      sort: 'random',
      per_page: 5,
    });

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        requestTimedOut = true;
        reject(`Sorry, the Goodreads request has taken too long`);
      }, 15000); // 30 second timeout

      oauth.get(
        `https://www.goodreads.com/review/list.xml?${params}`,
        session.goodreads.accessToken,
        session.goodreads.accessTokenSecret,
        (error, data, response) => {
          clearTimeout(timeout);

          if (error) {
            reject(`Sorry, there was an issue loading the Goodreads data`);
          } else {
            const { book } = JSON.parse(convert.xml2json(data, { compact: true })).GoodreadsResponse.books;
            const normalizedBooks = goodreads.normalizeData(book);
            resolve(normalizedBooks);
          }
        },
      );
    });
  },

  normalizeData: (books) => {
    return books.map((book) => ({
      author: book.authors.author.name._text,
      description: book.description._text,
      image: book.image_url._text,
      link: `http://www.powells.com/book/-${book.isbn13._text}?partnerID=${process.env.POWELLS_PARTNER_ID}`,
      rating: {
        average: book.average_rating._text,
        count: book.ratings_count._text
      },
      title: book.title._text
    }));
  },
};

module.exports = goodreads;
