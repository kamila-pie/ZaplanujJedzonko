![Coders-Lab-1920px-no-background](https://user-images.githubusercontent.com/152855/73064373-5ed69780-3ea1-11ea-8a71-3d370a5e7dd8.png)


## Jak zacząć
Żeby zacząć pracować z ScrumLab musisz:

* `clone` - zklonować to repozytorium na swój komputer
* `npm install` - zainstalować wszytkie potrzebne paczki


## Gulp
Poniżej możesz znaleźć wszytkie komendy Gulp które są dla Ciebie dostępne:

`gulp` lub `gulp serve`  - uruchomi GULP w trybie `watchmode`. Oznacza to że zostanie uruchomiona strona `localhost` która będzie odświeżana za każdym razem gdy zmienisz jakikolwiek plik `scss`, `js` lub `html`.

`gulp watch` - uruchamia GULP w trybie nadzoru, będzie kompilować `main.scss` w `css/main.css`

`gulp sass` - Kompiluje SASS do CSS


## Struktura katalogów
```
| - development/
	| - css/      
	| - fonts/
	| - images/  
	| - js/
	| - scss/
	| - app.html  
	| - index.html  
	| - recipes.html    
	| - schedules.html
| - distribution/
| - package.json
| - gulpfile.js
```

***gdzie:***
`distribution` - powinien zawierać zoptymalizowane pliki potrzebne do produkcyjnej wersji portalu.
`development`  - powinien zawierać kod źródłowy.
