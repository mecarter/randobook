const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const dateformat = require('dateformat');

const goodreads = require('../services/goodreads');

const DB_URL = process.env.DB_URL;
const DB_COLLECTION_NAME = 'user-months';

let db;

MongoClient.connect(DB_URL, (err, client) => {
  if (err) throw err;
  db = client.db(process.env.DB_NAME); // Dev
});

const booksResponse = (req, res) => {
  if (req.session.goodreads) {
    const userId = req.session.goodreads.userid;
    const currentMonth = dateformat(new Date(), 'mm-yyyy');

    db.collection(DB_COLLECTION_NAME).find({ userId }).sort({ month: -1 }).toArray((err, monthsData) => {
      if (err) {
        res.json({ error: true, errorMessage: `There was an error` });
        throw err;
      }

      // If current month already exists, return monthsData
      if (monthsData.find(m => m.month === currentMonth)) {
        res.json(monthsData);

      // Otherwise, fetch the data from Goodreads, add it to the DB, and then serve it
      } else {
        goodreads.fetchGoodreadsData(req.session)
          .then(books => {
            const currentMonthData = {
              userId,
              month: currentMonth,
              books,
              selected: 0,
            };

            db.collection(DB_COLLECTION_NAME).insertOne(currentMonthData, err => {
              if (err) {
                res.json({ error: true, errorMessage: `Failed to save data from Goodreads` });
                throw err;
              }
              res.json([
                currentMonthData,
                ...monthsData,
              ]);
            });
          })
          .catch(errorMessage => {
            res.json({ error: true, errorMessage: `Failed to fetch Goodreads data` });
          });
      }
    });
  } else {
    res.status(400);
    res.json({ error: true, errorMessage: 'Please login to use this service' });
  }
}

const booksUpdateSelectedResponse = (req, res) => {
  if (req.session.goodreads) {
    const userId = req.session.goodreads.userid;
    const { month } = req.params;
    const selected = Number(req.params.selected); // Enforce Number type

    db.collection(DB_COLLECTION_NAME).updateOne(
      { userId, month },
      { $set: { selected } },
      err => {
        if (err) throw err;
        res.json({ selected });
      }
    )

  } else {
    res.status(400);
    res.json({ error: true, errorMessage: 'Please login to use this service' });
  }
}

router.get('/books', booksResponse);
router.get('/books/:month/update_selected/:selected', booksUpdateSelectedResponse);

module.exports = router;
