import React from "react";

const ReadMe = props => {
  return(
    <div>
      <p>A Scraper, API, and UI for finding Pathfinder Classes from the Pathfinder SRD</p>

      <p>This is still in development.</p>

      <h2 id="theneed">The Need</h2>

      <p>The Pathfinder SRD makes it fairly easy to get information for most Pathfinder characters, yet there is no Pathfinder API (that I could find) that gets this material, nor is there any character creator that uses this. This API is supposed to scrape info from the PSRD and make it usable as an API. After this a character creator can be used to make a character with all information available.</p>

      <p>So the goal of this API is to have ALL references that would be needed for character building, both with 1st party and 3rd party material. It will also list everything by developer, so if a GM requires 'only Paizo and Dreamscarred', a character creator will be able to specify that. Sub-divisions will also be included, such as Path of War, Spheres of Might, and so on. As well, Arcane, Divine, Martial, and other specifics of classes will be listed, for similar reasons. If your GM says only Elemental Gods exist and there are no Divine classes besides ones like Druid or Ranger, you should be able to find which work. Since some archetypes change this, archetypes will also be listed similarly.</p>

      <p>As well, the API should have some suggested options based on some factors - like which classes would make a good gestalt due to needed Ability Scores, BAB, Saves, etc. As well people will be able to update 'user suggested' options. This will mainly be for munchkins to help out new players, as well as to consolidate build info into a character generator.</p>

      <p>To help with the munchkinning, x stat to y will also be listed. This may be static unless I can find a good reference that both updates and keeps the same format.</p>

      <p>This will be only Pathfinder, not 3.5 for now.</p>

      <h2 id="touse">To Use</h2>

      <ul>
      <li>Click on Notes on top right of panel to show current notes or add one</li>

      <li>click name of class on left to show description</li>

      <li>Save or Delete with Buttons</li>

      <li>Link to Class on SRD at top of description or by clicking name in top right</li>
      </ul>

      <a href="https://github.com/abruestle/PathfinderScraper">More Information found at my GitHub</a>
    </div>
  );
};

export default ReadMe;
