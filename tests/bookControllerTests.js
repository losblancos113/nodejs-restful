const should = require('should');
const sinon = require('sinon');

describe('Book Controller Test', () => {
  describe('POST', () => {
    it('should not allow an empty title', () => {
      var Book = (book) => {
        this.save = () => {};
      };
      var req = {
        body: {
          author: 'HMT'
        }
      };
      var res = {
        status : sinon.spy(),
        send: sinon.spy()
      };

      var bookController = require('../controllers/bookController')(Book);

      bookController.post(req, res);

      res.status.calledWith(400).should.equal(true, 'Bad Status '+res.status.args[0][0]);
      res.send.calledWith('title is required').should.equal(true);
    });
  });
});
