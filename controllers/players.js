function create(req, res) {
    // convert nowShowing's checkbox of nothing or "on" to boolean
    // req.body.nowShowing = !!req.body.nowShowing;
    // remove whitespace next to commas
    // req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
    // split if it's not an empty string
    // if (req.body.cast) req.body.cast = req.body.cast.split(',');
    const player = new Player(req.body);
    player.save(function(err, players) {
      // one way to handle errors
      if (err) return res.render('teams/new',{
        players
      });
      console.log(players);
      // for now, redirect right back to new.ejs
      res.redirect('teams/new', {
        players
      });
    });
}
function listAll(req, res){
    Player.find({}, function(err, players){
        if(err) throw err
       res.render('teams/new', {
 
            players
        })
    }) 
}

function show(req, res){
    Player.findById(req.params.id, function(err,player){
        console.log(req.params)
        if(err) console.log(err)
        res.render('teams/new', {
            player
        })
    })
}

// function newPlayer(req, res){
//     res.render('teams/new',{
//         players

//     })
// }

module.exports = {
    create,
    // new: newPlayer,
    listAll,
    show
}