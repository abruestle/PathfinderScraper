
# PathfinderScraper
A Scraper, API, and UI for finding Pathfinder Classes from the Pathfinder SRD


This is still in development.


## The Need

The Pathfinder SRD makes it fairly easy to get information for most Pathfinder characters, yet there is no Pathfinder API (that I could find) that gets this material, nor is there any character creator that uses this. This API is supposed to scrape info from the PSRD and make it usable as an API. After this a character creator can be used to make a character with all information available.

So the goal of this API is to have ALL references that would be needed for character building, both with 1st party and 3rd party material. It will also list everything by developer, so if a GM requires 'only Paizo and Dreamscarred', a character creator will be able to specify that. Sub-divisions will also be included, such as Path of War, Spheres of Might, and so on. As well, Arcane, Divine, Martial, and other specifics of classes will be listed, for similar reasons. If your GM says only Elemental Gods exist and there are no Divine classes besides ones like Druid or Ranger, you should be able to find which work. Since some archetypes change this, archetypes will also be listed similarly.

As well, the API should have some suggested options based on some factors - like which classes would make a good gestalt due to needed Ability Scores, BAB, Saves, etc. As well people will be able to update 'user suggested' options. This will mainly be for munchkins to help out new players, as well as to consolidate build info into a character generator.

To help with the munchkinning, x stat to y will also be listed. This may be static unless I can find a good reference that both updates and keeps the same format.

This will be only Pathfinder, not 3.5 for now.

## Coding

The current scraper is going to cover the basics of looking through classes and special abilities for classes. This uses Mongoose and MongoDB to hold onto class information and references to classes, as well as any player-made notes.

## To Use

* Click on Notes on top right of panel to show current notes or add one
* click name of class on left to show description
* Save or Delete with Buttons
* Link to Class on SRD at top of description or by clicking name in top right

### NPM Packages used

* Express
* BodyParser
* Logger
* Mongoose
* Axios
* Cheerio

## Current Available Options:

(still in initial development)

## Options wanted:

* Character Advancement
* Classes (And Options)
* Archetypes
* Feats
* Skills
* Traits
* Drawbacks
* Equipment
* Magic Items
* Spells
* Animal Companions

...And really most things you might look up in character creation. If this goes well, GM info will also be added.

## ToDo:

- [ ] Classes - Frontend
- [ ] Class Details - Frontend
- [ ] Classes - Scraping
- [ ] References - Scraping
- [ ] Class Details - Scraping
- [ ] Classes - Search and Rendering
- [ ] Class Details - Search and Rendering