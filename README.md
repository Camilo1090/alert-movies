# Alert Movies
Project for Alert Logic's Angular 4 course
This project is an implementation of 
[TMDB](https://developers.themoviedb.org/3/getting-started) api v3 created with Angular 4.

### List of Services

- **Discover Service**
- **Movies Service**
- **People Service**
- **Search Service**
- **Series Service**

### List of Components

- **App Component**
- **Discover Component**
- **Footer Component**
- **ListMovies Component**
- **MovieCast Component**
- **MovieDetails Component**
- **MovieImages Component**
- **MovieRecommendations Component**
- **MovieReviews Component**
- **MovieVideos Component**
- **ListPeople Component**
- **PersonDetails Component**
- **PersonImages Component**
- **PersonMovies Component**
- **PersonSeries Component**
- **SearchBar Component**
- **Search Component**
- **ListSeries Component**
- **SeriesCast Component**
- **SeriesDetails Component**
- **SeriesImages Component**
- **SeriesRecommendations Component**
- **SeriesVideos Component**
- **CustomCard Component**
- **LimitText Component**
- **NotFound Component**

### List of Pipes

- **FormatString Pipe** (markdown parser)

### Features
- **Full Responsive design**
- **Landing page:** trending movies and tv series
- **Search bar:** search for a movie, tv series or person and get the most relevant results instantly
- **Full Search:** perform a full search of the input term by category (movies, tv series, people) with paginated results 
- **Discover:** discover movies and tv series, filter them by year and genres and sort them by popularity, rating and title
- **List Movies:** paginated results filtered by category (popular, playing now, upcoming, top rated)
- **Movie Details:** shows most of the available information about a movie, including subsections for images, videos, cast, reviews and recommendations
- **List Series:** paginated results filtered by category (popular, on the air, latest, top rated)
- **Series Details:** shows most of the available information about a tv series, including subsections for images, videos, cast and recommendations
- **List People:** paginated results of popular people
- **Person Details:** shows most of the available information about a person, including subsections for movies, series and images
- **Modal image gallery:** modal gallery for images subsection in movies, series and people. Version: 4.0.1
- **Country flags:** country flag font icon displayed in movies and series details. Version: 2.9.0
- **Angular version:** 4.2.4
- **Covalent version:** 1.0.0-beta.8-1
- **Angular-Material version:** 2.0.0-beta.12
- **Bootstrap version:** 4.0.0-beta.2
- **Font-Awesome version:** 4.7.0
- **Deploy:**  [https://camilo1090.github.io/alert-movies](https://camilo1090.github.io/alert-movies)

### Tests
**100% function and line coverage** through unit tests.
Run `ng test --code-coverage` to create the folder `./coverage` and open `index.html` inside it to see the details of the coverage

## External modules

### Teradata Covalent
The UI of this project was created with [Teradata Covalent](https://github.com/Teradata/covalent) 
which is based on Angular Material

#### List of modules used

- **CovalentLayoutModule**
- **CovalentMenuModule**
- **CovalentSearchModule**
- **CovalentHttpModule**
- **CovalentMediaModule**
- **CovalentPagingModule**
- **CovalentLoadingModule**
- **CovalentNotificationsModule**
- **CovalentChipsModule**

### Angular Material
The [Angular-Material](https://github.com/angular/material)

#### List of modules used

- **MatListModule**
- **MatIconModule**
- **MatMenuModule**
- **MatTabsModule**
- **MatToolbarModule**
- **MatCardModule**
- **MatInputModule**
- **MatButtonModule**
- **MatSidenavModule**
- **MatTooltipModule**
- **MatDialogModule**
- **MatGridListModule**
- **MatSelectModule**

### Angular-cli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.7.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
