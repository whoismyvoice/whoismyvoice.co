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

**Run production build**
```
npm run build:start
```

**Run JSCS and ESLint**
* ESLint `npm run eslint`
* JSCS `npm run jscs`

##Dependencies
* [Superagent](https://www.npmjs.com/package/superagent)
* [Cities](https://www.npmjs.com/package/cities)
* [React Router](https://github.com/rackt/react-router)

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
