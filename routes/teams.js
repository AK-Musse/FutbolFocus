var express = require('express');
var router = express.Router();
const { getTeam, getTeams, addPlayer } = require("../controllers/teams");

/* GET teams listing. */
router.get('/', getTeams);

router.get("/:teamCode", getTeam);

router.post("/:teamCode/addPlayer", addPlayer);

module.exports = router;
