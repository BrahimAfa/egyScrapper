<h1 align="center"> EgyScrapper</h1>
<p align="center">
  <b >EgyScrapper is simple Nodejs app that turns egybest website to a consumable api.</b>
  </p>
  <br>

## Description :
EgyScrapper is an api that scrapes the important data in egybest website you can access all the new movies, series and also get a direct link to watch them. and all that is done with this api

## Installation

clone this repository to your local machine and then install the dependencies :  
```bash
$ git clone https://github.com/BrahimAfa/egyScrapper.git
$ cd egyScrapper
$ npm i
```
 after all the dependencies installed you can then run the app:
 "*preferred way is with the dev script*"
 ```bash
$ npm run dev
 ```

## Usage :

### Simple Example
you can either call this api in your local host with postman or you web browser or even Curl.
```bash
$ curl http://localhost:3030/movies
```
```json
[  {  
		"u":"movieID",  
		"rating": "imdbRating",  
		"img":"imageLink",  
		"title": "movieTitle",  
		"ribon": "videoQuality"
	},
...
]
```
to get a watch link for a certain movie :
```bash
$ curl http://localhost:3030/watch/movieID
```
```json
{  
	"watch": "link"  
}
```
### Existing routes 

 - ````/movies```` 
returns a list of movies and you can submit a page as a query string   ````/movies?page=4```` for more results.

    result : 
 ```json
[  {  
		"u":"String",  
		"rating": "int",  
		"img":"String",  
		"title": "String",  
		"ribon": "String"
	},
...
]
```
 - ````/series```` 
returns a list of tv Shows and you can submit a page as a query string   ````/series?page=4```` for more results.

    result : 
 ```json
[  {  
		"u":"String",  
		"rating": "int",  
		"img":"String",  
		"title": "String",  
		"ribon": "String"
	},
...
]
```
- ````/watch/:u````
returns a watch link for the submitted movie
```json
{  
	"watch": "String"  
}
```
 - ````/watch/:u````
