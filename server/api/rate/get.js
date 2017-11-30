const fetch = require('node-fetch');
const config = require('../../config');

const get = async (req, res) => {
  try {
    let rate = await fetch(
      `${config.apiUrl}/latest?base=${req.params.base}&symbols=${
        req.params.target
      }`,
      {
        method: 'GET'
      }
    ).then(res => res.json());
    // Ex.: {"base":"DKK","date":"2017-11-29","rates":{"GBP":0.11864}}

    res.json({
      base: rate.base,
      target: Object.keys(rate.rates)[0],
      date: rate.date,
      rate: Object.values(rate.rates)[0]
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = get;
