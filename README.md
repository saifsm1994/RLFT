# Project Description

This is a simple website, built in reactJS, that provides three main features

*   Lookup Pages
     
    * These accept a list of comma seperated values or a regex and search some given input text and returns matches, a count of matches, and with the use of appropriate regexes - surrounding text.
    * If using with a comma seperated list of values, this tool also allows you to choose which regex flags should apply during the search.

* Formatting pages
    * These pages attempt to format certain types of documents to remove extra line breaks and identify bullet points before placing each on a new line.
    * These are not perfect, but they do help significantly reduce formatting time.

* Gsheet Match Formula Formatting page
    * Accepts a list of terms you would like to filter for in Gsheets and the co-ordinates of the first cell under the header to filter.
    * Returns an appropriately formatted =match() or isNa(Match()) formula to allow you to either filter for these or filter these requested cells out.
    * Particularly useful for handling combinations of numbers and words, or search terms that include spaces - as these may or may not require quotations based on character type.


## Usage
* A live version of this page is availalbe at [https://saifsm1994.github.io/RLFT/](https://saifsm1994.github.io/RLFT/)
* If you would rather host your own you can use the commands below after changing homepage in package.json to your own domain or lack thereof.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### Acknowledgments

Project was bootstrapped with Create-React-App

Project utilizes bootstrap and reactstrap
