var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
/*
app.get('/scrape', function(req, res){
    */
var i;
for(i=1;i<3;i++){
    url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+i;

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            var title;
            var $ = cheerio.load(html);
            
            var json = { title : ""};
            $('.poi_card-display-title').each(function(){
                var data = $(this);
                title = data.text();
                console.log(title);
            });
            json.title = title;
            json.release = release;
          
        }
        
        
    })

}
app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;