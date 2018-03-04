var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();



//var result = 'nada';
var i;
var j;
var listRestauMich = []; 
var listAdressMich = [];
var json = [];
//for(i=1;i<3;i++)
//{

function titleRestau(){
    return new Promise((resolve, reject) => {
        for(i=0;i<35;i++){
        url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+i;
        //url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-2';
        request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){

            var title;
            var listUrl = [];
            var link = 'https://restaurant.michelin.fr';
            var $ = cheerio.load(html);
            

            $('.poi_card-display-title').each(function(){
                var data = $(this);
                
                listRestauMich.push(data.text());
                
            });
            resolve(listUrl);
        }
            
            
        
        
        });
    }
    });
}


function linkRestau(listUrl){
    return new Promise((resolve, reject) => {
        setTimeout(function() {
        //var urlTemp;
        for(i=0;i<35;i++){
        url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+i;
        //url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-2';
        request(url, function(error, response, html){
         
        // First we'll check to make sure no errors occurred when making the request

        if(!error){

            var $ = cheerio.load(html);
            


            
            $('.poi-card-link').each(function(){
                var data = $(this);
                var link = 'https://restaurant.michelin.fr'+data.attr('href');
                            
                listUrl.push(link);
                
            });
            
            resolve(listUrl);
        }
        else{
            console.log(error);
        }
        });
        }
        },1000);
        
    });
}


function adressRestau(listUrl){
    return new Promise((resolve, reject) => {
    setTimeout(function() {
       for(j=1;j<listUrl.length;j++){
            url = listUrl[j];
            //console.log(content[i]);
            request(url, function(error, response, html){

            // First we'll check to make sure no errors occurred when making the request
            
            if(!error){
                
                var adresse;
                var $ = cheerio.load(html);
                $('.postal-code').first().each(function(){
                    var data2 = $(this);
                    adresse = data2.text();
                    listAdressMich.push(adresse);
                });
                resolve(adresse);
            }
            else{
                console.log(error);
            }
            });
        }
    },2000);
    });
}

var listRestauLafou = [];
var listRestauReduction = [];




function createJson(listName,listAdress){
    setTimeout(function() {
    for(i=0;i<listName.length;i++){
        json.push({'title' : listName[i], 'adress': listAdress[i]});
    }
    console.log(json);
    var dictString = JSON.stringify(json);
    fs.writeFile("listeDeRestaurants.json", dictString);
    //console.log(listName[20]);
    }, 10000);

}



titleRestau().then(linkRestau).then(adressRestau).then(createJson(listRestauMich,listAdressMich));
