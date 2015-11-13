# Senate Project
Senate Project responsive website

##Stack
* React
* Webpack as build system
* Sass as CSS extension
* Babel as compiler & for [react-transform](https://github.com/gaearon/babel-plugin-react-transform)

##Setup

###Prerequisites
* [Webpack](https://webpack.github.io/docs/installation.html)
* [Docker Toolbox](https://www.docker.com/docker-toolbox)

###Steps
1. `git clone https://github.com/oursiberia/senate-project.git`
1. `cd senate-project`
1. `gem install sass`
1. `npm install`

**Build for development**
```
npm start
```

**Build for production**
```
npm run build
```

**Run production build (after building for production)**
```
mongod
npm run build:start
```

**Run JSCS and ESLint**
* ESLint `npm run eslint`
* JSCS `npm run jscs`

##Docker
To set up the Docker image and container open a terminal window using `docker quickstart terminal`.
* Navigate to senate-project folder
* Build the image `docker build -t oursiberia/senate-project .`
* After the image has been built, run a container w. `docker run -p 8080:8080 oursiberia/senate-project`
* To see the running container: Get your docker-machine ip using `docker-machine ip default`
* Visit docker-machine ip:8080

##Dependencies
* [Superagent](https://www.npmjs.com/package/superagent)
* [React Router](https://github.com/rackt/react-router)

##Development Guidelines
* `git fetch` and `git rebase` are preferred to `git pull`.
* Only `commit` changes you really want. Don't `git add .` unless you really mean to add everything.
* Use feature branches liberally
* When making a PR assign to another dev for code review. They'll merge into `master`.
* When creating a new page add required SASS stylesheets imports.
* Images should be included using `require`, see [Stylesheets & Images](https://github.com/petehunt/webpack-howto#5-stylesheets-and-images)

##Resources
A bunch of resources, which helped me get a better understanding of React, Webpack, SASS and how to make them play nice together.

* [React Tutorials by Tyler McGinnis](http://tylermcginnis.com/category/react/)
* [Webpack documentation](https://webpack.github.io/)
* [Pete Hunt's Webpack how to](https://github.com/petehunt/webpack-howto)
* [Christian Alfoni's Ultimate Webpack setup](http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup)
* [JXNBLK React + Webpack](http://jxnblk.com/writing/posts/static-site-generation-with-react-and-webpack/)
* [Jonathan Petitcolas Webpack Setup w. ES6 + SASS](http://www.jonathan-petitcolas.com/2015/05/15/howto-setup-webpack-on-es6-react-application-with-sass.html)
* [Ben Smithett on combining SASS & Webpack](http://bensmithett.com/smarter-css-builds-with-webpack/)
* [React & Flux](https://medium.com/@tribou/react-and-flux-for-the-rest-of-us-61f90869d51f)
