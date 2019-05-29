# SpotiTracker

SpotiTracker is a Spotify's search feature replica with some additional filters/features. A Spotify account is required in order to use this web app.

Users can search songs, albums and/or artists in a concrete year or between a year range. Hipsters can filter these results obtaining only those with at most 10 popularity (out of 100).

## Tools

Frontend framework
```
Vue
```

Libraries
```
Vuex, Axios
```

Testing frameworks
```
Jest
```


## Views

### /

Connect to your Spotify account granting access to SpotiTracker

### /search

Initial search view

### /search/results

Summary of the most popoular items for every filter type chosen (ex: songs, albums and/or artists).

### /search/songs/:searchTerm | /search/artists/:searchTerm | search/albums/:searchTerm

Each view lists its own type and displays more items as the user scrolls down throughout the page.


## Search History

The search history allows the user to, with the ease of a click, search again applying the same filters as the selected searched entry.


## Firebase hosting

The app is deployed in firebase:

https://spotitracker.firebaseapp.com/search


## Setup

Install node_modules
```
npm install
```

Initialize dev server
```
npm run serve
```

Run tests
```
npm run test:unit
```
