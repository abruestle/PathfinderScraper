import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  //Get Routes
    //From database
  //     findAllClasses: function(req, res) {
  //       db.Class
  //         .find(req.query)
  //         .sort({ date: -1 })
  //         .then(dbModel => res.json(dbModel))
  //         .catch(err => res.status(422).json(err));
  //     },
  //     getAllClasses: function() {
  //       // Grab every document in the Classes collection
  //       //console.log(collection);
  //       //console.log(JSON.stringify(hbsObject));
  //       db.Classes.find({})
  //       .then(function(dbresults) {
  //         // If we were able to successfully find Classes, send them back to the client or send them back to be rendered
  //         return dbresults;
  //       })
  //       .catch(function(err) {
  //         // If an error occurred, send it to the 
  //           return err;
  //       });
  //     },
  //     getClass: function(id) {
  //       db.Class.findOne({
  //         _id: id
  //       }).populate("notes")
  //       .then(function(dbClass) {
  //         return dbClass;
  //       })
  //       .catch(function(err) {
  //         return err;
  //       });
  //     },
  //     // getGroups: function() {
  //     //   db.Reference
  //     //     .find(req.query)
  //     //     .then(dbModel => res.json(dbModel))
  //     //     .catch(err => res.status(422).json(err));
  //     // },
  //   //From Pathfinder SRD
  //     scrapeClasses: function(group) {

  //     },
  // //post Class
  //     postClass: function() {

  //     },
    //classes with a short description:
  //   function scrapePaizoShort(result, func, res, last){
  //     //Find description by doing another scrape
  //     var term = result.name.toLowerCase();
  //     var link = "http://paizo.com/pathfinderRPG/prd/";
  //     var description = "";
  //     var searchterm = "p:contains('"+term+"')";
  //     switch (result.category.toLowerCase().replace(" ","-")) {
  //       case "core-classes":
  //         link = link + "coreRulebook/classes.html";
  //         break;
  //       case "occult":
  //         link = link + "occultAdventures/classes/index.html";
  //         break;
  //       case "unchained":
  //         link = link + "unchained/classes/index.html";
  //         term = term.replace("unchained ","");
  //         searchterm = "body "+searchterm+":has(a)";
  //         console.log("search term replaced");
  //         break;
  //         //has all classes; will implement later
  //       // case "":
  //       //   link = "http://karzoug.info/srd/classes/coreClasses/barbarian.htm";
  //       //   searchterm = "body";
  //       //   break;
  //       case "base-classes":
  //         link = "http://www.d20pfsrd.com/classes/base-classes/";
  //         break;
  //       default:
  //         description = "No description found";
  //     }

  //     axios.get(link)
  //     .then(function(responsedesc) {
  //       var $ = cheerio.load(responsedesc.data);
  //       //.clone().children().remove().end().text() for karzoug's srd.
  //       result.description = $(searchterm).first().text();

  //       func(result, res, last);
  //     })
  //     .catch(function(err) {
  //       return res.json(err);
  //     });
  //   }

  // //deliver results to database
  //   function updatedb(result, res, last){
  //     //Updates class or makes a new one
  //     try {
  //       db.Class.findOneAndUpdate({
  //         name: result.name,
  //         category: result.category
  //       }, result, {
  //         upsert: true,
  //         new: true
  //       }, function() {
  //       //console.log("Updated database: "+ result.name);
  //         if(last){
  //           res.json("Scrape Complete");
  //         }
  //       });
  //     }
  //     catch (err){
  //       res.json(err);
  //     }
  //   }
  //general
    
  getRandomDog: function() {
    return axios.get("https://dog.ceo/api/breeds/image/random");
  },
  getDogsOfBreed: function(breed) {
    return axios.get("https://dog.ceo/api/breed/" + breed + "/images");
  },
  getBaseBreedsList: function() {
    return axios.get("https://dog.ceo/api/breeds/list");
  }
};
// * `/api/articles` (get) - your components will use this to query MongoDB for all saved articles

// * `/api/articles` (post) - your components will use this to save an article to the database

// * `/api/articles` (delete) - your components will use this to delete a saved article in the database

// * `*` (get) - will load your single HTML page (with ReactJS) in `client/build/index.html`. Make sure you put this after all other GET routes