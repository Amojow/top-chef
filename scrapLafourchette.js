//Scrap LaFourchette
var cheerio = require('cheerio');
var request = require('request');
url = "https://m.lafourchette.com/api/restaurant-prediction?name=le%20jardin";
request(url, function(error, response, html){
	if(!error){
		
		var $ = cheerio.load(html);	
		var data = $(this);
		var response = JSON.parse(data);
		console.log(response.name);
	}
		
});
