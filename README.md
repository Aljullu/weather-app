# Weather App

Weather App that lets the user introduce a natural language query and
it parses it to return relevant results after fetching data in AccuWeather.

Some accepted queries are:

* City names
* Temperature description words (_freezing_, _cold_, _cool_, _warm_ and _hot_)
* Weather condition texts (_sunny_. _clear_, _mostly cloudy_, _light fog_...)

Those can be combined with three operators:

* _and_ (including _but_ and _as well as_)
* _or_
* _but_

These way, natural language queries like _cold but not freezing and cloudy_ are
understood.

Tech stack:
* React
* Redux
* Babel
* Testing: Karma and Mocha
* Documentation: ESDoc
* Linting: ESLint

# Installation

```sh
npm install
npm test
npm start
```

# Generate docs

```sh
npm run doc
```
