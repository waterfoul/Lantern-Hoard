# Lantern Hoard
[![Stories in Ready](https://badge.waffle.io/waterfoul/Lantern-Hoard.svg?label=ready&title=Ready)](http://waffle.io/waterfoul/Lantern-Hoard)
[![Build Status](https://travis-ci.org/waterfoul/Lantern-Hoard.svg?branch=master)](https://travis-ci.org/waterfoul/Lantern-Hoard)
[![Heroku](https://heroku-badge.herokuapp.com/?svg=1&app=lantern-hoard)](https://lantern-hoard.herokuapp.com/)

This is a fan reproduction of kingdom death monster using node.js, express, sock.js, react, and redux. If you want to
play a game click the heroku button above to head to our deployed site. We use github issues and a waffle board for 
tracking so if you find any issues please report them and we will take a look.

## Development
In order to work on this project you need a working node.js 6+ environment and a postgresql database running on 
localhost. You will also need to setup a keys file with at least one of the social media providers setup. Exact details 
on this setup varies but is usually sign up for the developer console on the provider, create an app, setup it up for 
login using http://localhost:1337 as the url and http://localhost:1337/api/auth/login/<provider> for the callback 
(provider can be one of google, facebook, or github). Finally grab the client ID and client secret and place them in the
template below, saving the file as .lantern-hoard.json in your home folder.
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
Once you have that going run `npm install` or `yarn`, then `npm run dev` or `yarn dev`. The dev server should start up.
Livereload is working for JS only so updates to the scss or html will require a manual refresh

### Folder structure
The folders are setup as follows
* The root folder - Dumping ground for files which must sit at the root
* browser - Contains all files which are destined for the browser. These files should use ES6, including imports
  * browser/components - For react components
  * browser/data - Contains the game data files for things like monsters, items, and cards. Does contain code for the 
    special cases of certain cards and items
  * browser/reducers - Contains the reducers for the main redux store adn the thunks for the gameState
  * browser/scenarios - For holding scenarios which can be used to spawn new games
  * browser/static - Gets served straight to the browser as /static
  * browser/utils - Utilities which are shared across multiple browser folders 
* common/gameState - Contains the reducer for the game state. This is shared between the client and server so it must 
  use patterns which are understood by node.js version 6
* server - Contains all the files to make the server work
  * server/api - Holds the express routes
  * server/db - Holds the sequelize information and models
  * server/utils - holds a few utilities which didn't fit into the categories above

## Testing
We use mocha for testing, if you run `npm run test` or `yarn test` it will do a single run of the test suite. 
`npm run test-watch` or `yarn test-watch` will start up the test runner in watch mode. You can also add 
` -- --grep <pattern>` to the end of any of those commands to filter the tests which are run. 