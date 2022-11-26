var express = require('express');
var router = express.Router();
const { updateTeams } = require("../controllers/updateTeams");


/* GET teams listing. */
router.get('/', updateTeams);

module.exports = router;
