const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)) // eslint-disable-line no-undef
      .catch(next => {
        console.log({next});
      });
  };

module.exports = asyncMiddleware;
