### This is only the front-end as deploying on Render is easier when projects are split. The link to the backend code is [here](https://github.com/nogalcy/trip-tracker-backend)

### Finished Front-end for Trip Tracker

* React.js and Node.js frontend, Bootstrap used for basic css components and then specified with the individual css files
* "api.js" used for making calls to the server to help organize code better
* Each major component split up by the name in the folders
* Full account registration and login with JWT tokens
* Once logged in, all trip entries corresponding with your account will load
* Double click anywhere on the map and fill out the trip form to create a new pin / trip
* Clicking on any pre-existing pin will give a full trip summary and the option to update or delete the trip
* Help button provided in the top right corner to give information on how to work the website
* Full Profile section with the ability to see user information, most recent trips, and favorite trips along with a sign out option
* Intend to expand the site with more features in the future, potentially a social aspect allowing users to follow or friend others and see their favorite trips

## Purpose
This site uses React.js and Node.js for the front end. I am very familiar with these libraries and given that the learning experience was mostly tailored towards MongoDB I wanted to make sure I was comfortable with the front-end. If I were to do this again, I would probably try and use axios as the router opposed to the basic express router because that would make it a little easier and less repetitive to make calls to the server as axios can be used to do that as well.
