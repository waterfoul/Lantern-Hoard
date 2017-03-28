# The Lantern Hoard
[![Stories in Ready](https://badge.waffle.io/waterfoul/Lantern-Hoard.svg?label=ready&title=Ready)](http://waffle.io/waterfoul/Lantern-Hoard)
[![Build Status](https://travis-ci.org/waterfoul/Lantern-Hoard.svg?branch=master)](https://travis-ci.org/waterfoul/Lantern-Hoard)
[![Heroku](https://heroku-badge.herokuapp.com/?svg=1&app=lantern-hoard)](https://lantern-hoard.herokuapp.com/)

The Lantern Hoard is a fan reproduction of Kingdom Death: Monster made with Node.js, Express, SockJS, React, and Redux. If you would like to play a game click the Heroku button above to visit our deployed site. We use GitHub issues and a Waffle board for tracking, so if you find any issues please report them and we will take a look.

## Development
In order to work on this project you need a working Node.js 6+ environment and a PostgreSQL database running on
localhost. You will also need to setup a keys file with at least one of the social media providers configured. Details
of this setup varies, but it usually involves signing up for the developer console on the provider, creating an app, setting it up it up for login using http://localhost:1337 as the url and http://localhost:1337/api/auth/login/<provider> for the callback (provider can be one of Google, Facebook, or GitHub). Finally, grab the client ID and client secret and place them in the template below. Save the file as .lantern-hoard.json in your home folder.
```
{
        "facebookClientId": "",
        "facebookClientSecret": "",
        "googleClientId": "",
        "googleClientSecret": "",
        "githubClientId": "",
        "githubClientSecret": ""
}

```
Once you have that going, run `npm install` or `yarn`, then `npm run dev` or `yarn dev`. The dev server should start.
Livereload is working for JS only so updates to the SCSS or HTML will require a manual refresh.

### Folder structure
The folders are setup as follows...
* The root folder - Dumping ground for files which must sit at the root
* browser - Contains all files which are destined for the browser. These files should use ES6, including imports
  * browser/components - For React components
  * browser/data - Contains the game data files for things like monsters, items, and cards. Does contain code for the
    special cases of certain cards and items
  * browser/reducers - Contains the reducers for the main Redux store and the thunks for the gameState
  * browser/scenarios - For holding scenarios which can be used to spawn new games
  * browser/static - Gets served straight to the browser as /static
  * browser/utils - Utilities which are shared across multiple browser folders
* common/gameState - Contains the reducer for the game state. This is shared between the client and server so it must
  use patterns which are understood by Node.js version 6
* server - Contains all the files to make the server work
  * server/api - Holds the express routes
  * server/db - Holds the sequelize information and models
  * server/utils - holds a few utilities which didn't fit into the categories above

## Testing
We use mocha for testing. If you run `npm run test` or `yarn test` it will do a single run of the test suite.
`npm run test-watch` or `yarn test-watch` will start up the test runner in watch mode. You can also add
` -- --grep <pattern>` to the end of any of those commands to filter the tests which are run.

## Credits
The Lantern Hoard was started as an educational project by students of Fullstack Academy of Code. Much like Kingdom Death itself, this is a labor of love. No copyright infringement is intended.

Kingdom Death Copyright © 2016 Adam Poots Games, LLC. All Rights Reserved
Background Images by Scott Delorme - https://www.artstation.com/artist/sdelorme
