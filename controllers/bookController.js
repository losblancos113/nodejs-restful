var bookController = (Book) => {
  var post = (req, res) => {
    let book = new Book(req.body);
    console.log(book);
    book.save((err) => {
      if (err) {
        res.status(500).send(err);
      }else {
        res.status(200);
        res.send(book);
      }
    });
  };
  var get = (req, res) => {
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
  };
  return {
    post: post,
    get: get
  };
}

module.exports = bookController;
