//Dependencies
  var express = require("express");
  var bodyParser = require("body-parser");
  var logger = require("morgan");
  var mongoose = require("mongoose");
  var axios = require("axios");
  var cheerio = require("cheerio");
//Models
var db = require("./models");
//Initializing
  var PORT = process.env.PORT || 3000;
  var app = express();
  // Use morgan logger for logging requests
  app.use(logger("dev"));
  // Use body-parser for handling form submissions
  app.use(bodyParser.urlencoded({ extended: false }));
  // Use express.static to serve the public folder as a static directory
  app.use(express.static("public"));
  // By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
  // Connect to the Mongo DB
  var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
  mongoose.Promise = Promise;
  mongoose.connect(MONGODB_URI);
// Routes
  //Route to make routes to classes from references (this way all the 3rd party classes and core classes can be gotten, even if more are made or more made from different companies)
    //So this takes a reference and spits out the most specific reference or references based on that.
  //Route for using reference to get class info (Name, Link, Description, Where it came from (Core, Hybrid, a specific 3rd party company, etc.), )
  //Route that takes class link and gets abilities - maybe add more later (HP, BAB, Saves...) 
    app.get("/class/:type/:name/:link", function(req, res) {
      request("http://www.d20pfsrd.com/classes/"+req.params.link, function(error, response, html) {
        var $ = cheerio.load(html);
        //Special abilities - once per time seen
        $("table:first tbody tr td a").each(function(i, element) {
          var link = "http://www.d20pfsrd.com/classes/" + req.params.link+$(element).attr("href");
          var title = $(element).text();
          var level = $(element).parent().parent().children("td:first-child").text();
          var description = $("[name='TOC-Fast-Movement-Ex-']").parent().nextUntil("h4").html();

          if(title) {
            db.classSpecifics.insert({"class":req.params.class,"title": title, "link":link, "level":level, "description": description});
          }
        });
        db.classSpecifics.find({"class":req.params.class}, function(err, data){
          if(err){
            console.log(err);
          }else{
            res.json(data);
          }
        });
      });
    });

  //Currently have not found a good way to get full descriptions...

    // function scrapeDescription(category, name){
    //   //Find description by doing another scrape
    //   var link = category.toLowerCase().replace(" ", "-") + "/" + name.toLowerCase();
    //   axios.get("https://sites.google.com/site/pathfinderogc/classes/"+ link).then(function(responsedesc) {
    //     var $ = cheerio.load(responsedesc.data);
    //     console.log(name);
    //     //result.description = cheer("article-content p").nextUntil('h2');
    //     //console.log(JSON.stringify(result.description, null, 2));
    //     console.log($("#sites-canvas-main-content div .sites-tile-name-content-1 div p").before('stand in their way.').text());
    //     console.log("done");
        
    //   });
    // }

//While I am still looking for a way to get description from some site, I can at least do the paizo classes with a short description:
  function scrapePaizoShort(result, func){
    //Find description by doing another scrape
    var term = result.name.toLowerCase();
    var link = "http://paizo.com/pathfinderRPG/prd/";
    var description = "";
    var searchterm = "p:contains('"+term+"')";
    switch (result.category.toLowerCase().replace(" ","-")) {
      case "core-classes":
        link = link + "coreRulebook/classes.html";
        break;
      case "occult":
        link = link + "occultAdventures/classes/index.html";
        break;
      case "unchained":
        link = link + "unchained/classes/index.html";
        term = term.replace("unchained ","");
        searchterm = "body "+searchterm+":has(a)";
        console.log("search term replaced");
        break;
        //has all classes; will implement later
      // case "":
      //   link = "http://karzoug.info/srd/classes/coreClasses/barbarian.htm";
      //   searchterm = "body";
      //   break;
      case "base-classes":
        link = "http://www.d20pfsrd.com/classes/base-classes/";
        break;
      default:
        description = "No description found";
    }

    axios.get(link).then(function(responsedesc) {
      var $ = cheerio.load(responsedesc.data);
      //.clone().children().remove().end().text() for karzoug's srd.
      result.description = $(searchterm).first().text();

      func(result);
    });
  }

//deliver results to database
  function updateMongo(){
    db.Class.create(result)
      .then(function(dbClass) {
        console.log(dbClass);
      })
      .catch(function(err) {
        return res.json(err);
      });
  }

//Test Route for individual class
app.get("/scrapebarbarian", function(req, res) {
  var result = {
    name: "Barbarian",
    category: "Core Classes"
  }
  scrapePaizoShort(result);

});

//description
app.get("/scrape/:category/:class", function(req, res) {
  var result = {
    name: req.params.class,
    category: req.params.category
  }
  scrapePaizoShort(result);
});

// A GET route for scraping
app.get("/scrapecore", function(req, res) {
  axios.get("http://www.d20pfsrd.com/classes/core-classes/").then(function(response) {
    var $ = cheerio.load(response.data);
    $("ul.ogn-childpages li").not("ul li ul li").each(function(i, element) {
      var result = {};
      // Add the text and href of every link, and save them as properties of the result object
      result.name = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href").replace('http://www.d20pfsrd.com/classes/','');
      result.category = "Core Classes";
      console.log(result.name);
      scrapePaizoShort(result);

    });

    // If we were able to successfully scrape and save an Class, send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Classes from the db
app.get("/classes", function(req, res) {
  // Grab every document in the Classes collection
  db.Class.find({})
    .then(function(dbClass) {
      // If we were able to successfully find Classes, send them back to the client
      res.json(dbClass);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Class by id, populate it with it's note
app.get("/classes/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Class.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbClass) {
      // If we were able to successfully find an Class with the given id, send it back to the client
      res.json(dbClass);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Class's associated Note
app.post("/classes/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Class with an `_id` equal to `req.params.id`. Update the Class to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Class.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbClass) {
      // If we were able to successfully update an Class, send it back to the client
      res.json(dbClass);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
