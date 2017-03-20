const express = require('express');
var Book = require('../models/bookModel');


var bookRouter = express.Router();

bookRouter.route('/books')
  .post((req, res) => {
    let book = new Book(req.body);
    console.log(book);
    book.save((err) => {
      if (err) {
        res.status(500).send(err);
      }else {
        res.status(200).send("INSERT SUCCESSED");
      }
    });
  })
  .get((req, res) => {
    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query,(err, books) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }else {
        res.json(books);
      }
    });
  });

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId,(err, book) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }else {
        res.json(book);
      }
    });
  });

module.exports = bookRouter;
