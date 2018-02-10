//Dependencies
  var express = require("express");
  var bodyParser = require("body-parser");
  var path = require("path");
  var logger = require("morgan");
  var mongoose = require("mongoose");
  var axios = require("axios");
  var cheerio = require("cheerio");
//Models
var db = require("./models");
//Initializing
  var PORT = process.env.PORT || 5000;
  var app = express();
  app.use(logger("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static("public"));
  // By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
  var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
  mongoose.Promise = Promise;
  mongoose.connect(MONGODB_URI);

//handlebars
  var exphbs = require("express-handlebars");
  app.engine("handlebars", exphbs({ defaultLayout: "main" }));
  app.set("view engine", "handlebars");
//Functions

  //classes with a short description:
    function scrapePaizoShort(result, func, res, last){
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

      axios.get(link)
      .then(function(responsedesc) {
        var $ = cheerio.load(responsedesc.data);
        //.clone().children().remove().end().text() for karzoug's srd.
        result.description = $(searchterm).first().text();

        func(result, res, last);
      })
      .catch(function(err) {
        return res.json(err);
      });
    }

  //deliver results to database
    function updatedb(result, res, last){
      //Updates class or makes a new one
      try {
        db.Class.findOneAndUpdate({
          name: result.name,
          category: result.category
        }, result, {
          upsert: true,
          new: true
        }, function() {
        //console.log("Updated database: "+ result.name);
          if(last){
            res.json("Scrape Complete");
          }
        });
      }
      catch (err){
        res.json(err);
      }
    }
  //general
    function findall(collection, req, res, func, hbsObject){
      // Grab every document in the Classes collection
      //console.log(collection);
      //console.log(JSON.stringify(hbsObject));
      collection.find({})
      .then(function(dbresults) {
        // If we were able to successfully find Classes, send them back to the client or send them back to be rendered
        func(dbresults, req, res, hbsObject);
      })
      .catch(function(err) {
        // If an error occurred, send it to the 
          res.json(err);
      });
    }
  //Render Page
    function renderPage(page, req, res){
      var hbsObject = {
        page: page
      };
      if(page = "Classes"){
        hbsObject.blank = {
          name: "new",
          category: "",
          _id: "newNote"
        };
        findall(db.Class, req, res, renderPage2, hbsObject);
      }
      
    }
    function renderPage2(results, req, res, hbsObject){
      //console.log("starting rendering");
      hbsObject.classes = results;
      findall(db.ClassNote, req, res, renderPage3, hbsObject);
    }
    function renderPage3(results, req, res, hbsObject){
      //console.log("rendering...");
      hbsObject.notes = results;
      console.log(JSON.stringify(hbsObject, null, 2));
      res.render(hbsObject.page.toLowerCase(), hbsObject);
    }
// Routes
  //Route to make routes to classes from references (this way all the 3rd party classes and core classes can be gotten, even if more are made or more made from different companies)
    //So this takes a reference and spits out the most specific reference or references based on that.
  //Route for using reference to get class info (Name, Link, Description, Where it came from (Core, Hybrid, a specific 3rd party company, etc.), )
  //Route that takes class link and gets abilities - maybe add more later (HP, BAB, Saves...) 

//Finished Routes
  //Test Route for individual class description
    app.get("/scrapebarbarian", function(req, res) {
      var result = {
        name: "Barbarian",
        category: "Core-Classes"
      }
      scrapePaizoShort(result, updatedb, res, true);

    });

  //Get route for scraping individual class's description
    app.get("/scrape/:category/:class", function(req, res) {
      var result = {
        name: req.params.class,
        category: req.params.category
      }
      scrapePaizoShort(result, updatedb, res, true);
    });

  // A GET route for scraping the core classes
    app.get("/scrapecore", function(req, res) {
      axios.get("http://www.d20pfsrd.com/classes/core-classes/").then(function(response) {
        var $ = cheerio.load(response.data);
        $("ul.ogn-childpages li").not("ul li ul li").each(function(i, element) {
          var result = {};
          // Add the text and href of every link, and save them as properties of the result object
          result.name = $(this)
            .children("a")
            .text()
            .replace(" ","-");;
          result.link = $(this)
            .children("a")
            .attr("href");
          result.category = "Core-Classes";
          console.log(result.name);
          if (j == list.length -1) {
            var last = true;
          } else {
            var last = false;
          }
          scrapePaizoShort(result, updatedb, res, last);

        });

        // If we were able to successfully scrape and save an Class, send a message to the client
      })
      .catch(function(err) {
        return res.json(err);
      });
    });

  // A GET route for scraping a set of classes 
    app.get("/scrape", function(req, res) {
      //Currently just core
      list = [
        {
          sourceCategory: "Core-Classes",
          fullLink: "http://www.d20pfsrd.com/classes/core-classes/",
          reference: "ul.ogn-childpages li"
        }
      ];
      for(let j = 0; j < list.length; j++){
        //console.log(list[j].reference);
        axios.get(list[j].fullLink).then(function(response) {
          var $ = cheerio.load(response.data);
          console.log(list[j].reference);
          var objects = $(list[j].reference).not("ul li ul li");

          objects.each(function(i, element) {
            var result = {};
            // Add the text and href of every link, and save them as properties of the result object
            result.name = $(this)
              .children("a")
              .text()
              .replace(" ","_");
            result.link = $(this)
              .children("a")
              .attr("href");
            result.category = list[j].sourceCategory;
            console.log(result.name);
            if(j === list.length -1 && i === objects.length -1){
              var last = true;
            } else {
              var last = false;
            };
            console.log(last);
            scrapePaizoShort(result, updatedb, res, last);

          });
        })
        .catch(function(err) {
          return res.json(err);
        });
      }
    });

  // Route for getting all Classes from the db
    app.get("/classes", function(req, res) {
      findall(db.Class, req, res, res.json);
    });
  //Route for getting all Notes from the db
    app.get("/classnotes", function(req, res) {
      findall(db.ClassNotes, req, res, res.json);
    });
  // Route for grabbing a specific Class by category and name, populate it with it's note
    app.get("/classes/:category/:name", function(req, res) {
      db.Class.findOne({
          name: req.params.class,
          category: req.params.category
        }).populate("notes")
        .then(function(dbClass) {
          res.json(dbClass);
        })
        .catch(function(err) {
          res.json(err);
        });
    });

  // Route for saving/updating an Class's associated Note
    app.post("/classes/:category/:name", function(req, res) {
      db.Note.create(req.body)
        .then(function(dbNote) {
          //Find class matching Note
          return db.Class.findOneAndUpdate({
            name: req.params.class,
            category: req.params.category
          }, {
            //push note id
            $push: {notes: dbNote._id}
          }, { new: true });
        })
        .then(function(dbClass) {
          res.json(dbClass);
        })
        .catch(function(err) {
          res.json(err);
        });
    });
  
  //Route for rendering
    app.get("/",function(req, res) {
      renderPage("Classes", req, res);
    });
//Delete
    

//Unfinished Routes
  //Class Special Abilities
    app.get("/details/:type/:name/:link", function(req, res) {
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

  //Full descriptions from Paizo...may have to use other way as it is a dynamic page

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




//
// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
