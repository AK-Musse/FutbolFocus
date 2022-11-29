var express = require('express');
var router = express.Router();
const { getPlayer ,updatePlayer, deletePlayer } = require("../controllers/player");

/* GET teams listing. */
router.get('/:playerId', getPlayer);
router.post('/:playerId', updatePlayer);
router.post('/delete/:playerId', deletePlayer);

module.exports = router;
