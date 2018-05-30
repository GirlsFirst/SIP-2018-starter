const invalidLonLat = -200;

var lastCountry = "";
var countryLon = invalidLonLat;
var countryLat = invalidLonLat;

function init() {
	
}

//http://api.citygridmedia.com/content/places/v2/search/where?what=pizza&sort=highestrated&where=chicago,IL&publisher=test


function makeCountryRequest() {
	var countryName = document.getElementById("country-name").value;
	
	if(countryName === "") {
	 	alert("You didn't enter a country name!");
	 	return;
	}

	var query = "https://restcountries.eu/rest/v2/name/"+countryName+"?fullText=true";

	query = query.replace(/ /g, "%20");

	countryRequest = new XMLHttpRequest();
	
	countryRequest.open('GET', query, true);

	countryRequest.onload = processCountryRequest;

	countryRequest.send();
}

function processCountryRequest(reqType) {
	if(countryRequest.readyState != 4) {
		return;
	}

	if (countryRequest.status != 200 || countryRequest.responseText === "") {
	 //alert("We were unable to find your requested country!");
	 	document.getElementById("country-name").value = "error, try again";
	 	return;
	}

	var countryInformation = JSON.parse(countryRequest.responseText);
	countryLon = countryInformation[0].latlng[1];
	countryLat = countryInformation[0].latlng[0];

	 console.log(countryInformation);

	if(lastCountry === countryInformation[0].name) {
		return;
	}

	var countryElts = document.getElementsByClassName("selected-country");
	var dataElts = document.getElementsByClassName("country-data");
	var i;
	for (i = 0; i < countryElts.length; i++) {
		countryElts[i].innerHTML = "Selected Country: " + countryInformation[0].name;
		dataElts[i].innerHTML = "no data";
	}

	lastCountry = countryInformation[0].name;
}

function makeSunriseSunsetRequest() {
	if(countryLon === invalidLonLat) {
	 	alert("You didn't get country data!");
	 	return;
	}

	var query = "https://api.sunrise-sunset.org/json?lat="+countryLat+"&lng="+countryLon+"&date=today";

	query = query.replace(/ /g, "%20");

	sunriserequest = new XMLHttpRequest();
	
	sunriserequest.open('GET', query, true);

	sunriserequest.onload = processSunriseSunsetRequest;

	sunriserequest.send();
}

function processSunriseSunsetRequest() {
	if(sunriserequest.readyState != 4) {
		return;
	}

	if (sunriserequest.status != 200 || sunriserequest.responseText === "") {

	 	return;
	}

	var sunriseInformation = JSON.parse(sunriserequest.responseText);
	// console.log(sunriseInformation)
	document.getElementById("sunset-time").innerHTML = "Sunrise: " + sunriseInformation.results.sunrise + " UTC and Sunset: " + sunriseInformation.results.sunset + " UTC";
}

function makeISSRequest() {
	if(countryLon === invalidLonLat) {
	 	alert("You didn't get country data!");
	 	return;
	}

	// Requires jquery to work!
	var query = "http://api.open-notify.org/iss-pass.json?lat="+countryLat+"&alt=20&lon="+countryLon;

	query = query.replace(/ /g, "%20");

	$.getJSON(query + "&callback=?", null, processISSRequest);
}

function processISSRequest(issInformation) {
	 console.log(issInformation);
	var date = new Date(issInformation.response[1]['risetime']*1000);
	document.getElementById("iss-time").innerHTML = date.toString();
}

function makeSWRequest() {
	var character = document.getElementById("sw-character").value;

	console.log(character);

	if(character === "") {
	 	alert("You didn't write a movie!");
	 	return;
	}

	var query = "https://swapi.co/api/people/?search="+character;

	query = query.replace(/ /g, "%20");

	$.get(query + "&callback=?", null, processSWRequest);
}

function processSWRequest(swInformation) {
	//console.log(swInformation);
	document.getElementById("sw-info").innerHTML = swInformation.results[0].name + ", born: "+ swInformation.results[0].birth_year;
}

function makeArtistRequest() {
	var artist = document.getElementById("music-artist").value;
	var genre = document.getElementById("music-genre").value;

	//console.log(artist);

	if(artist === "") {
	 	alert("You didn't write a name for the artist!");
	 	return;
	}

	var query = "http://musicbrainz.org/ws/2/artist/?query=artist:"+artist+"%20AND%20tag:"+genre+"&fmt=json";

	query = query.replace(/ /g, "%20");

	$.get(query + "&callback=?", null, processArtistRequest);
}

function processArtistRequest(artistInformation) {
	//console.log(artistInformation);
	document.getElementById("arist-info").innerHTML = artistInformation.artists[0].name + " started in " + artistInformation.artists[0]["life-span"].begin;
}

function makeBerryRequest() {
	var berry = document.getElementById("berry-name").value;

	console.log(berry);

	if(berry === "") {
	 	alert("You didn't write a name for the berry!");
	 	return;
	}

	var query = "https://pokeapi.co/api/v2/berry/"+berry+"/";

	query = query.replace(/ /g, "%20");

	$.get(query, null, processBerryRequest);
}

function processBerryRequest(berryInformation) {
	//console.log(berryInformation);
	document.getElementById("berry-info").innerHTML = "Natural Gift: " + berryInformation.natural_gift_type.name + " at Power: " + berryInformation.natural_gift_power;
}

window.onload = init;
