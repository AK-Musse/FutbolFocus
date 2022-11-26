const User = require('../models/user');




function index(req, res, next) {
    // Make the query object to use with Student.find based up
    // the user has submitted the search form or now
    const modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
    // Default to sorting by name
    const sortKey = req.query.sort || 'name';
    User.find(modelQuery)
      .sort(sortKey)
      .exec(function (err, userA) {
        if (err) return next(err);
        // Passing search values, name & sortKey, for use in the EJS
        res.render('teams', {
          userA,
          name: req.query.name,
          sortKey,
          user: req.user
        });
      });
  }
  
  
  module.exports = {
      index,
  }