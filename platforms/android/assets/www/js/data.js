angular.module('cdcgeneralapp.data', [])

// Home Data: Home page configuration
.factory('Data', function() {
	var data = {};

	data.items = [{
		title: 'DOTW',
		icon: 'ion-calendar',
		note: 'Disease of the Week',
		url: '#/app/dotw'
	}, {
		title: 'Health Articles',
		icon: 'ion-android-bicycle',
		note: 'Health Articles',
		url: '#/app/healtharticles'
	}, {
		title: 'Gallery',
		icon: 'ion-images',
		note: 'Our Photos',
		url: '#/app/gallery'
	}, {
		title: 'YouTube',
		icon: 'ion-social-youtube',
		note: 'YouTube Videos',
		url: '#/app/youtubevideos'
	}, {
		title: 'Quiz',
		icon: 'ion-university',
		note: 'CDC Quiz Module',
		url: '#/app/quiz'
	}];

	return data;
})

.factory('AppData', function($http, $q, AppDataStorage) {
	var deferred = $q.defer(),
		promise = deferred.promise,
		data = [],
		service = {},
		feed = 'http://peterbenoit.com/dev/cdc.summary.feed.json';

	service.async = function() {
		$http({
			method: 'GET',
			url: feed,
			timeout: 5000
		}).
		success(function(d) {
			data = d;

			console.log("data: ", data);

			// do something with data

			AppDataStorage.save(data);
			deferred.resolve();
		}).
		error(function() {
			data = AppDataStorage.all();
			deferred.reject();
		});

		return promise;
	}

	service.getAll = function() {
		return data;
	};

	service.get = function(newId) {
		return data[newId];
	};

	service.getBySource = function(source) {
		var d, obj = [];
		for (d in data) {
			if (data[d].source === source) {
				obj.push(data[d]);
			}
		}
		return obj;
	}
	
	return service;	
})

// Menu Data: Menu configuration
.factory('MenuData', function() {
	var data = {};

	data.items = [{
			title: 'Home',
			icon: 'ion-home',
			url: '#/app'
		}, {
			title: 'Typeface',
			icon: 'ion-code',
			url: '#/app/typeface'
		}, {
			title: 'Cards',
			icon: 'ion-code',
			url: '#/app/cards'
		}, {
			title: 'Guided Quiz',
			icon: 'ion-university',
			url: '#/app/guided-quiz'
		}, {
			title: '4 Column Gallery',
			icon: 'ion-code',
			url: '#/app/galleryfour'
		}, {
			title: '3 Column Gallery',
			icon: 'ion-code',
			url: '#/app/gallerythree'
		}, {
			title: '2 Column Gallery',
			icon: 'ion-code',
			url: '#/app/gallerytwo'
		},
		// { 
		// 	title: 'Form Quiz',
		// 	icon: 'ion-university',
		// 	url: '#/app/form-quiz'
		// },
		{
			title: 'Grid',
			icon: 'ion-grid',
			url: '#/app/grid'
		}
	];

	return data;
})

// Plugins Data: Mobile Plugins configuration
.factory('PluginsData', function() {
	var data = {};

	data.items = [{
		title: 'Device',
		icon: 'ion-ipad',
		note: 'Device API',
		url: '#/app/plugins/device'
	}, {
		title: 'Geolocation',
		icon: 'ion-location',
		note: 'Geolocation API',
		url: '#/app/plugins/geolocation'
	}, {
		title: 'Notifications',
		icon: 'ion-alert',
		note: 'Dialogs API',
		url: '#/app/plugins/notifications'
	}, {
		title: 'Barcode',
		icon: 'ion-qr-scanner',
		note: 'Barcode Scanner',
		url: '#/app/plugins/barcodescanner'
	}];

	return data;
})

// Home Stream Data: JSON
.factory('HomeStreamData', function($http, $q, HomeStreamStorage) {
	var deferred = $q.defer();
	var promise = deferred.promise;
	var data = [];
	var service = {};
	var card = "";
	var dirty = false;
	var facebookCard = {
		"title": "Facebook",
		"description": "CDC Gov",
		"cardtype": "type-social-left",
		"date": "2081-02-04T18:26:56.828Z",
		"image": "img/Facebook.png",
		"templatetype": "c1",
		"targetUrl": "http://www.facebook.com/CDC",
		"size": "full"
	};

	var twitterCard = {
		"title": "Twitter",
		"description": "CDC Emergency",
		"cardtype": "type-social-right",
		"date": "2081-02-04T18:26:56.828Z",
		"image": "img/Twitter.png",
		"templatetype": "c1",
		"targetUrl": "https://twitter.com/CDCEmergency",
		"size": "full"
	};	
	var facebookCard2 = {
		"title": "Facebook",
		"description": "CDC Gov",
		"cardtype": "type-social-top",
		"date": "2081-02-04T18:26:56.828Z",
		"image": "img/Facebook.png",
		"templatetype": "c1",
		"targetUrl": "http://www.facebook.com/CDC",
		"size": "half"
	};

	var twitterCard2 = {
		"title": "Twitter",
		"description": "CDC Emergency",
		"cardtype": "type-social-top",
		"date": "2081-02-04T18:26:56.828Z",
		"image": "img/Twitter.png",
		"templatetype": "c1",
		"targetUrl": "https://twitter.com/CDCEmergency",
		"size": "half"
	};

	var getRandom = function(max, min) {
		return Math.floor(Math.random() * (max - min + 1));	
	}

	// Getting all data on first load instead of with each page
	//var feed = 'http://www.filltext.com/?rows=30&title={firstName}~{lastName}&pretty=true&date={date}&description={lorem|20}&source=[%22Health%20Articles%22,%22Disease%20of%20the%20Week%22,%22FluView%20Summary%22,%22Vital%20Signs%22,%22Blogs%22,%22FastStats%22,%22Newsroom%22]&cardtype=["type-a1","type-a1","type-a1","type-a2","type-a2","type-a3","type-a3","type-b1","type-b2","type-c1","type-c2","type-c3","type-d1","type-d2","type-e1","type-e2"]';
	var feed = 'http://www.filltext.com/?rows=30&id={index}&title={lorem|10}&pretty=true&date={date}&description={lorem|40}&source=[%22Health%20Articles%22,%22Disease%20of%20the%20Week%22,%22FluView%20Summary%22,%22Vital%20Signs%22,%22Blogs%22,%22FastStats%22,%22Newsroom%22]&cardtype=[%22type-a1%22,%22type-a1%22,%22type-a1%22,%22type-a2%22,%22type-a2%22,%22type-a3%22,%22type-a3%22,%22type-b1%22,%22type-b2%22,%22type-c1%22,%22type-d1%22,%22type-d2%22,%22type-e1%22,%22type-e2%22]';

	service.async = function() {
		$http({
			method: 'GET',
			url: feed,
			timeout: 5000
		}).
		// this callback will be called asynchronously
		// when the response is available.
		success(function(d) {
			data = d;
			// var lastCardType = data[data.length - 1].cardtype;
			var page = 1,
				pageitems = 10;

			for (var key in data) {

				if(typeof data[key].size === 'undefined') {
					data[key].size = 'full';	
				}

				var previouscard = typeof data[key-1] !== 'undefined' ? data[key-1] : '';

				if(previouscard && previouscard.cardtype.indexOf('type-d') === 0) {
					if(!previouscard.modified) {
						data[key].cardtype = 'type-d1';
						data[key].modified = true;
					}
				}

				// RULES for "D" cards
				// 1. Always in pairs
				// 2. if the very last card is a D card, and the previous card isn't, change it!

				// set a new card
				card = data[key].cardtype;

				// quick and dirty, add a random image based on card type since the json source doesn't provide images
				if (card.indexOf('type-a') === 0) {
					// + key to randomize
					data[key].image = 'http://placeimg.com/335/250/any/' + key;
				} else 
					if (card.indexOf('type-c') === 0) {
						data[key].image = 'http://placeimg.com/80/80/any/' + key;
				} else 
					if (card.indexOf('type-d') === 0) {
						data[key].image = 'http://placeimg.com/150/120/any/' + key;
						data[key].size = 'half';
				}
			}

			// insert FB and Twitter (top type) at the top
			data.splice(0, 0, twitterCard2);
			data.splice(1, 0, facebookCard2);

			// TODO
			// insert sources which aren't in aggregate feed into random spots, but not between type-ds
			var position = getRandom(9,2);
			data.splice(position, 0, facebookCard);

			// if(data[position].cardtype.indexOf('type-d') === 0) {
			// 	data.splice(position + 1, 0, facebookCard);
			// }
			// else {
			// 	data.splice(position, 0, facebookCard);	
			// }

 			position = getRandom(9,2);
 			data.splice(position, 0, twitterCard);

			// if(data[position].cardtype.indexOf('type-d') === 0) {
			// 	data.splice(position + 1, 0, twitterCard);
			// }
			// else {
			// 	data.splice(position, 0, twitterCard);	
			// }


			HomeStreamStorage.save(data);
			deferred.resolve();
		}).
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		error(function() {
			data = HomeStreamStorage.all();
			deferred.reject();
		});

		return promise;

	};

	service.getAll = function() {
		return data;
	};

	service.get = function(newId) {
		return data[newId];
	};

	service.getBySource = function(source) {
		var d, obj = [];
		for (d in data) {
			if (data[d].source === source) {
				obj.push(data[d]);
			}
		}
		return obj;
	}
	
	return service;
})

// DOTW Data: JSON
.factory('DotwData', function($http, $q, DotwStorage) {
	var deferred = $q.defer();
	var promise = deferred.promise;
	var data = [];
	var service = {};

	service.async = function() {
		$http({
			method: 'GET',
			url: 'http://www.cdc.gov/mobile/Applications/CDCGeneral/DotW/diseases.xml',
			transformResponse: function(data) {
				// convert the data to JSON and provide
				// it to the success function below
				var x2js = new X2JS();
				var json = x2js.xml_str2json(data);
				return json;
			},
			timeout: 5000
		}).
		// this callback will be called asynchronously
		// when the response is available.
		success(function(d) {
			data = d.diseases.disease;

			var cardtypes = 'a,b,c,d,e'.split(','),
				card = '';


			for (var key in data) {
				// if the selected card is a double
				if (card === 'd') {
					data[key].cardtype = 'type-' + card;
					card = ''; // card is cached, reset it if we're using the previous value
				} else {
					// get the card for this item
					card = cardtypes[Math.floor(Math.random() * cardtypes.length)];
				}

				// if one hasn't been applied already
				if (typeof data[key].cardtype === 'undefined') {
					data[key].cardtype = 'type-' + card;
				}
			}

			DotwStorage.save(data);
			deferred.resolve();
		}).
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		error(function() {
			data = DotwStorage.all();
			deferred.reject();
		});

		return promise;

	};

	service.getAll = function() {
		return data;
	};

	service.get = function(newId) {
		return data[newId];
	};

	return service;
})

// Health Articles Data: JSON
.factory('HealthArticlesData', function($http, $q, HealthArticlesStorage) {
	var deferred = $q.defer();
	var promise = deferred.promise;
	var data = [];
	var service = {};

	service.async = function() {
		$http({
			method: 'GET',
			url: 'json/health-articles.xml',
			transformResponse: function(data) {
				// convert the data to JSON and provide
				// it to the success function below
				var x2js = new X2JS();
				var json = x2js.xml_str2json(data);
				return json;
			},
			timeout: 5000
		}).
		// this callback will be called asynchronously
		// when the response is available.
		success(function(d) {
			data = d.feed.entry;

			var cardtypes = 'a,b,c,d,e'.split(','),
				card = '';


			for (var key in data) {
				// if the selected card is a double
				if (card === 'd') {
					data[key].cardtype = 'type-' + card;
					card = ''; // card is cached, reset it if we're using the previous value
				} else {
					// get the card for this item
					card = cardtypes[Math.floor(Math.random() * cardtypes.length)];
				}

				// if one hasn't been applied already
				if (typeof data[key].cardtype === 'undefined') {
					data[key].cardtype = 'type-' + card;
				}
			}

			console.log(data);
			HealthArticlesStorage.save(data);
			deferred.resolve();
		}).
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		error(function() {
			data = HealthArticlesStorage.all();
			deferred.reject();
		});

		return promise;

	};

	service.getAll = function() {
		return data;
	};

	service.get = function(productId) {
		return data[productId];
	};

	service.getLetterLimit = function() {
		return 100;
	};

	return service;
})

// Health Articles Data: JSON
.factory('VitalSignsData', function($http, $q, VitalSignsStorage) {
	var deferred = $q.defer();
	var promise = deferred.promise;
	var data = [];
	var service = {};

	service.async = function() {
		$http({
			method: 'GET',
			url: 'json/vital-signs.xml',
			transformResponse: function(data) {
				// convert the data to JSON and provide
				// it to the success function below
				var x2js = new X2JS();
				var json = x2js.xml_str2json(data);
				return json;
			},
			timeout: 5000
		}).
		// this callback will be called asynchronously
		// when the response is available.
		success(function(d) {
			data = d.feed.entry;

			var cardtypes = 'a,b,c,d,e'.split(','),
				card = '';


			for (var key in data) {
				// if the selected card is a double
				if (card === 'd') {
					data[key].cardtype = 'type-' + card;
					card = ''; // card is cached, reset it if we're using the previous value
				} else {
					// get the card for this item
					card = cardtypes[Math.floor(Math.random() * cardtypes.length)];
				}

				// if one hasn't been applied already
				if (typeof data[key].cardtype === 'undefined') {
					data[key].cardtype = 'type-' + card;
				}
			}

			console.log(data);
			VitalSignsStorage.save(data);
			deferred.resolve();
		}).
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		error(function() {
			data = VitalSignsStorage.all();
			deferred.reject();
		});

		return promise;

	};

	service.getAll = function() {
		return data;
	};

	service.get = function(productId) {
		return data[productId];
	};

	service.getLetterLimit = function() {
		return 100;
	};

	return service;
})

// Settings Data: Settings configuration
.factory('SettingsData', function() {
	var data = {};

	data.items = {
		options: [{
			name: 'First Option',
			value: true
		}, {
			name: 'Second Option',
			value: false
		}, {
			name: 'Third Option',
			value: false
		}],
		sorting: 'A',
		range: 30
	};

	return data;
})

// YouTube Data: YouTube Videos configuration
.factory('YouTubeData', function($http, $q) {

	// CDC Directors Videos: https://www.youtube.com/playlist?list=PLvrp9iOILTQb0_WAGpHGyMTzi2WZwAXaL

    var youtubeKey = 'AIzaSyClMa-MaKro_m95tb--4LaAorl-NmGPJxc';
    var apiUrl = 'https://www.googleapis.com/youtube/v3/';
    var videosUrl    = apiUrl + 'playlistItems?part=snippet&key=' + youtubeKey + '&maxResults=' + 20;
    var playlistsUrl = apiUrl + 'channels?part=contentDetails&key=' + youtubeKey;	

	// var youtubeKey = 'AIzaSyBBdZZvS5Jve2kkKzoj_qH8YanXtnuUWZ4',
	// maxResults = 10,
	var playlistId = 'PLvrp9iOILTQb0_WAGpHGyMTzi2WZwAXaL&';
	// apiUrl = 'https://www.googleapis.com/youtube/v3/',
	// // videosUrl = apiUrl + 'playlistItems?part=id,snippet&playlistId=' + playlistId + 'key=' + youtubeKey + '&maxResults=' + maxResults,
	// videosUrl = apiUrl + 'playlistItems?part=id,snippet&key=' + youtubeKey + '&maxResults=' + maxResults,
	// playlistsUrl = apiUrl + 'channels?part=contentDetails&key=' + youtubeKey;

// console.log(videosUrl);	
	//https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyClMa-MaKro_m95tb--4LaAorl-NmGPJxc&maxResults=20

	//https://www.googleapis.com/youtube/v3/playlistItems?part=id,snippet&playlistId=PLvrp9iOILTQb0_WAGpHGyMTzi2WZwAXaL&key=AIzaSyBBdZZvS5Jve2kkKzoj_qH8YanXtnuUWZ4&maxResults=10
	https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyClMa-MaKro_m95tb--4LaAorl-NmGPJxc&maxResults=20&playlistId=null
	var username = 'cdc',
	data = [],
	result = [],
	videos = [],
	service = {};

	service.async = function(categoryId, id) {

		var deferred = $q.defer();
		var promise = deferred.promise;
		var url = videosUrl + '&playlistId=' + playlistId;

		if (!playlistId) {
			deferred.reject();
		}

		$http({
			method: 'GET',
			url: url,
			timeout: 5000
		}).
		// this callback will be called asynchronously
		// when the response is available.
		success(function(d) {
			result = d;
			data = result.items;
			deferred.resolve();
		}).
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		error(function() {
			deferred.reject();
		});
	

		// service.getPlaylistId().then(function(playlistId) {

		// 	if (!playlistId) {
		// 		deferred.reject();
		// 	}

		// 	var url = videosUrl + '&playlistId=' + playlistId;

		// 	$http({
		// 		method: 'GET',
		// 		url: url,
		// 		timeout: 5000
		// 	}).
		// 	// this callback will be called asynchronously
		// 	// when the response is available.
		// 	success(function(d) {
		// 		result = d;
		// 		data = result.items;
		// 		deferred.resolve();
		// 	}).
		// 	// called asynchronously if an error occurs
		// 	// or server returns response with an error status.
		// 	error(function() {
		// 		deferred.reject();
		// 	});

		// });

		return promise;

	};

	service.getPlaylistId = function() {

		var url = playlistsUrl + '&forUsername=' + username;

		console.log(url);

		return $http.get(url).then(function(response) {
			var items = response.data.items;
			if (items.length && items[0].contentDetails.relatedPlaylists.uploads) {
				return items[0].contentDetails.relatedPlaylists.uploads;
			}

			return null;
		});
	}

	service.getVideos = function() {
		return data;
	};

	service.getVideo = function(videoId) {
		return data[videoId];
	};

	return service;

})

.factory('GalleryData', function(){
	// newp
})