const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)) // eslint-disable-line no-undef
    .catch((next) => { // eslint-disable-line no-shadow
      console.log({ next }); // eslint-disable-line no-console
    });
};

module.exports = asyncMiddleware;
