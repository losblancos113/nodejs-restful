const express = require('express');


var routes = (Book) => {
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

  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId,(err, book) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }else if (book) {
        req.book = book;
        next();
      }else {
        res.status(404).send('No book found!');
      }
    });
  });
  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      Book.findById(req.params.bookId,(err, book) => {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save((err) => {
          if (err) {
            res.status(500).send(err);
          }else {
            res.json(req.book);
          }
        });
      });
    })
    .patch((req, res) => {
      if (req.body._id) {
        delete req.body._id;
      }
      if (req.body._v) {
        delete req.body._v;
      }
      for (let field in req.body) {
        req.book[field] = req.body[field];
      }
      req.book.save((err) => {
        if (err) {
          res.status(500).send(err);
        }else {
          res.json(req.book);
        }
      });
    });
    return bookRouter;
};

module.exports = routes;
