var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./db/config.js');
var User = require('./db/models/users.js');
var Ingredient = require('./db/models/ingredients.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/build/index.html'));
// });


//user creation api route
app.post('/api/users', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username})
    .exec(function(err, user) {
      if (!user) {
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save(function(err, newUser) {
          if (err) { res.status(500).send(err); }
          // TODO: create session
          console.log(`${username} created`);
          res.send(`${username} created`);
        });
      } else {
        console.log(`${username} exists`);
        res.send(`${username} already exists`);
        // TODO: redirect back to the signup page
      }
    });
});

//ingredient search api route
app.post('/api/ingredients', function(req, res) {
	var ingredient = req.body.ingredient;

	Ingredient.findOne({name: ingredient})
	  .exec(function(err, ingredientName) {
	  	//if there is an ingredient, return the document JSON, on the front end, we can extrapolate the name and link!
	  	if(ingredientName) {
	  		console.log(`${ingredient} found`);
	  		res.json(ingredientName);
	  		res.end();
	  	} else {
	  		console.log(`error ${ingredient} not found`);
	  		res.send(`${ingredient} not in database`);
	  	}
	  })

})

var port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log(`listening on ${port}`);
});

module.exports = app;
