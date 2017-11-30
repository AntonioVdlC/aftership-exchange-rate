const get = async (req, res) => {
  try {
    // Hardcoded for now, but might be interesting to put this
    // information into a table or a JSON file!
    let currencies = [
      { symbol: 'EUR', name: 'Euro', country: 'eu' },
      { symbol: 'USD', name: 'Dollar', country: 'us' }
    ];

    res.json(currencies);
  } catch (err) {
    console.log(err);
  }
};

module.exports = get;
