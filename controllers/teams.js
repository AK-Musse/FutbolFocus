// const axios = require("axios");
const Player = require("../models/player");
const Team = require("../models/team")

async function getTeams(req, res, next) {
  const teamsData = await Team.find({});
  res.render('teams', { teamsData, user: req.user });
}

async function getTeam(req, res, next) {
  const teamData = await Team.findOne({code: req.params.teamCode}).populate("players");
  // const players = Player.find({team: teamData._id});
  console.log(teamData);
  res.render('team', { teamData, user: req.user });
}

async function addPlayer(req, res, next) {
  const teamData = await Team.findOne({code: req.params.teamCode});
  const player = new Player({
    name: req.body.name,
    age: req.body.age,
    goals: req.body.goals,
    team: req.body.team,
  });
  player.save().then(p => {
    // teamData.update({ "$push": {"players": p._id}});
    teamData.players.push(p);
    teamData.save();
  });
  console.dir(req.body);
  // res.render('team', { teamData, user: req.user });
  // res.end();
  res.redirect('')
}

module.exports = {
    getTeams,
    getTeam,
    addPlayer,
}