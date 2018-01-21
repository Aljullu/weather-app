# Weather App

Weather App that lets the user introduce a natural language query and
parses it to return relevant results after fetching data in AccuWeather.

Some accepted queries are:

* City names
* Temperature description words (_freezing_, _cold_, _cool_, _warm_ and _hot_)
* Weather condition texts (_sunny_. _clear_, _mostly cloudy_, _light fog_...)

Those can be combined with three operators:

* _and_ (including two synonyms: _but_ and _as well as_)
* _or_
* _not_

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

# Screenshots

Main page:

<img src="https://raw.githubusercontent.com/Aljullu/weather-app/master/screenshots/main-page.png" alt="" width="436" height="399" />

Natural Language Processing:

<img src="https://raw.githubusercontent.com/Aljullu/weather-app/master/screenshots/natural-language-processing.png" alt="" width="436" height="399" />

Smart suggestions

<img src="https://raw.githubusercontent.com/Aljullu/weather-app/master/screenshots/smart-suggestions.png" alt="" width="436" height="399" />
