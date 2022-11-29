const axios = require("axios");
const Team = require("../models/team");

const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
  params: {league: '140', season: '2022'},
  headers: {
    'X-RapidAPI-Key': '7e93b6203cmsh8bb3b7d746cdc5fp189d90jsn8db860a8468e',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

const updateDB = axios.request(options).then(function (response) {
	console.log(response.data.response);
    const teams = response.data.response.map(teams => new Team({
        name:teams.team.name,
        founded:teams.team.founded,
        code:teams.team.code,
        country:teams.team.country,
    }))
    teams.map(team => team.save(function(error, document) {
        if (error) {
            console.error(error);
        }
    }))

}).catch(function (error) {
	console.error(error);
});

function updateTeams(req, res, next) {
    res.send('Update Teams');
    updateDB();
}

module.exports = {
    updateTeams,
}