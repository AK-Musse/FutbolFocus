const Team = require("../models/team")
const Player = require("../models/player");

async function getPlayer(req, res, next) {
  const playerData = await Player.findById(req.params.playerId);
  console.log(`player data = ${playerData}`);
res.render("player", { playerData, user: req.user });
}


async function updatePlayer(req, res, next) {
  const update = { 
    name:req.body.name,
    age:req.body.age,
    goals:req.body.goals,
  };
  const player = await Player.findByIdAndUpdate(req.params.playerId, update, { new: true }).populate("team");
res.redirect(`/teams/${player.team.code}`);

}

async function deletePlayer(req, res, next) {
  const player = await Player.findByIdAndDelete(req.params.playerId);
  console.log(`player players type = ${typeof player.team.players}`);
  console.log(player);

  const team = await Team.findById(player.team._id).populate("players");
  team.players = team.players.filter(p => p._id !== player._id);
  await team.save();
  console.log(`team players type = ${typeof team.players}`);
  console.log(team);
  const newteam = await Team.findById(player.team._id).populate("players");
  console.log(`newteam = ${newteam}`);
  res.redirect(`/teams/${team.code}`);
}

module.exports = {
  updatePlayer,
  getPlayer,
  deletePlayer,
}