const express = require('express');


var routes = (Book) => {
  var bookRouter = express.Router();
  var bookController = require('../controllers/bookController')(Book);
  bookRouter.route('/books')
    .post(bookController.post)
    .get(bookController.get);

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
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          res.status(500).send(err);
        }else {
          res.status(204).send('Removed')
        }
      });
    });
    return bookRouter;
};

module.exports = routes;
