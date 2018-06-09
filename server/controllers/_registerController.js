const user = require('../database/userQueries.js');


const login = (req, res) => {
  user.checkUserPasswordMatchDB(req.body.username, req.body.password, (err) => {
    if (err) {
      console.error('Error checking username and password in database');
    } else {
      res.sendStatus(200);
    }
  });
};

const signup = (req, res) => {
  user.saveNewUserDB(req.body, (err) => {
    if (err) {
      console.error('User could not be saved into the database');
    } else {
      res.sendStatus(201);
    }
  });
};

module.exports = {
  login,
  signup,
};
