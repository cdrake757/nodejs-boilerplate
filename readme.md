## Node.js Boilerplate by Cameron Drake

This is a very simple Node.js Boilerplate that uses Express, Jade, Stylus, Nib and Coffeescript. It does absolutely nothing, but provides a good structure for your app as well as configured middleware so that you can immediately get to work. I've included some mixins and figures that can be helpful in making basic web layouts quickly. Although LESS is very well integrated with Node.js, I chose to use SASS because Compass is an excellent tool. This Boilerplate comes preconfigured with Production/Development Environments as well as server config files that allow you to proxy node.js (I highly recommend that you use a faster webserver like Nginx to serve static files, and proxy Node.js).

Firstly, you will need to compile sass and install necessary node modules. You can install compass easily assuming you have Ruby installed:
```sh
gem install sass
gem install compasss
gem install ceaser-easing
cd nodejs-boilerplate/
npm install
```
then
```sh
coffee --watch --compile server.coffee
```
or (for production) 
```sh
compass -c prod_config.rb -- force
```
Starting the server in development is simple
```sh
coffee server.coffee
```
If you would like to run in production pass "-p" after the above line. You will need to make sure that Nginx is running and that you have symlinked the public directory to the correct place for nginx.

## Goals

* HTML5 ready. Use the new elements with confidence.
* Designed with progressive enhancement in mind.
* CSS normalizations and common bug fixes.
* Responsive Design templates.
* Modular SASS to provide basic mixins and structure
* The latest jQuery via CDN.
* An optimized Google Analytics snippet.

## Dependencies

* Node.js, Express, Coffeescript, Compass
* Animate.css [http://daneden.me/animate/]
* Normalize.css [http://necolas.github.io/normalize.css/]


### Major components:

* jQuery: MIT/GPL license
* Compasss (for CSS pre-processing)
* CoffeeScript
* Express: http://expressjs.com/guide.html
* For server dependencies see package.json
* For client dependencies see views/includes/
