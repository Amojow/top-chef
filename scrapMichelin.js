var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();


//var result = 'nada';
var i;
var listUrl = [];   

        
//for(i=1;i<3;i++)
//{

function titleRestau(){
    return new Promise((resolve, reject) => {
       // url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+i;
        url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-2';
        request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){

            var title;
            var link;
            var $ = cheerio.load(html);
            var json = { title : ""}; 

            $('.poi_card-display-title').each(function(){
                var data = $(this);
                title = data.text();
                //result.push(title);
                result= 'skuuh';
                //result = title;
                console.log(title);
            });
            resolve(title);
            
            
        
        }
        });
    });
}


function linkRestau(){
    return new Promise((resolve, reject) => {
       // url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-'+i;
        url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-2';
        request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){

            var $ = cheerio.load(html);
            


            
            $('.poi-card-link').each(function(){
                var data = $(this);
                link = data.attr('href');
                
                var urlTemp = "https://restaurant.michelin.fr"+link;             
                listUrl.push(urlTemp);

            });
            
            resolve(listUrl);
        }
        else{
            console.log('error');
        }
        });
    });
}
var j=0;
function adressRestau(listU){
    return new Promise((resolve, reject) => {
        for(j=1;j<listU.length;j++){
            url = listU[i];
            console.log(listU[i]);
               
            request(url, function(error, response, html){

            // First we'll check to make sure no errors occurred when making the request
            
            if(!error){

                
                var $ = cheerio.load(html);
                


                
                var adresse;
                var $ = cheerio.load(html);
                $('.postal-code').each(function(){
                    var data2 = $(this);
                    adresse = data2.text();
                    console.log(adresse);
                });
            
            }
            });
        }
    });
    

}



titleRestau()
.then(linkRestau)
.then(adressRestau)


    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    
   
    /*
    url = url2;
    request(url, function(error2, response2, html2){
                    if(!error2){

                        var adresse;
                        var $ = cheerio.load(html);
                        $('.postal-code').each(function(){
                            var data2 = $(this);
                            adresse = data2.text();
                            console.log(adresse);
                        });

                    }

                })
                */


