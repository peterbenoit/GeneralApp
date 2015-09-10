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

            console.log('data: ', data);

            // do something with data

            AppDataStorage.save(data);
            deferred.resolve();
        }).
        error(function() {
            data = AppDataStorage.all();
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
    };

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
            title: 'App Intro',
            icon: 'ion-speedometer',
            url: '#/'
        }, {
            title: 'Typeface',
            icon: 'ion-code',
            url: '#/app/typeface'
        }, {
            title: 'Cards',
            icon: 'ion-code',
            url: '#/app/cards'
        }, {
            title: 'Thumbnails',
            icon: 'ion-code',
            url: '#/app/thumbnails'
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
        }, {
            title: 'Grid',
            icon: 'ion-grid',
            url: '#/app/grid'
        }, {
            title: 'External (CDC)',
            icon: 'ion-android-globe',
            url: '#/app/external/www.cdc.gov'
        }, {
            title: 'External (HHS)',
            icon: 'ion-android-globe',
            url: '#/app/external/www.hhs.gov'
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
    var card = '';
    var dirty = false;

    var facebookCard = {
        'title': 'Facebook',
        'description': 'CDC Gov',
        'cardtype': 'type-social-left',
        'date': '2081-02-04T18:26:56.828Z',
        'image': 'img/Facebook.png',
        'sourcetype': 'social',
        'targetUrl': 'http://www.facebook.com/CDC',
        'size': 'full'
    };

    var twitterCard = {
        'title': 'Twitter',
        'description': 'CDC Emergency',
        'cardtype': 'type-social-right',
        'date': '2081-02-04T18:26:56.828Z',
        'image': 'img/Twitter.png',
        'sourcetype': 'social',
        'targetUrl': 'https://twitter.com/CDCEmergency',
        'size': 'full'
    };

    var pinterestCard = {
        'title': 'Pinterest',
        'description': 'CDC',
        'cardtype': 'type-social-left',
        'date': '2081-02-04T18:26:56.828Z',
        'image': 'img/Pinterest.png',
        'sourcetype': 'social',
        'targetUrl': 'https://pinterest.com/cdcgov',
        'size': 'full'
    };

    var instagramCard = {
        'title': 'Instragram',
        'description': 'CDC',
        'cardtype': 'type-social-right',
        'date': '2081-02-04T18:26:56.828Z',
        'image': 'img/Instagram.png',
        'sourcetype': 'social',
        'targetUrl': 'https://instagram.com/cdcgov/',
        'size': 'full'
    };

    var facebookCard2 = {
        'title': 'Facebook',
        'description': 'CDC Gov',
        'cardtype': 'type-social-top',
        'date': '2081-02-04T18:26:56.828Z',
        'image': 'img/Facebook.png',
        'sourcetype': 'social',
        'targetUrl': 'http://www.facebook.com/CDC',
        'size': 'half'
    };

    var twitterCard2 = {
        'title': 'Twitter',
        'description': 'CDC Emergency',
        'cardtype': 'type-social-top',
        'date': '2081-02-04T18:26:56.828Z',
        'image': 'img/Twitter.png',
        'sourcetype': 'social',
        'targetUrl': 'https://twitter.com/CDCEmergency',
        'size': 'half'
    };
    var pinterestCard2 = {
        'title': 'Pinterest',
        'description': 'CDC',
        'cardtype': 'type-social-top',
        'date': '2081-02-04T18:26:56.828Z',
        'image': 'img/Pinterest.png',
        'sourcetype': 'social',
        'targetUrl': 'https://pinterest.com/cdcgov',
        'size': 'full'
    };

    var getRandom = function(max, min) {
        return Math.floor(Math.random() * (max - min + 1));
    };

    // Getting all data on first load instead of with each page
    //var feed = 'http://www.filltext.com/?rows=30&title={firstName}~{lastName}&pretty=true&date={date}&description={lorem|20}&source=[%22Health%20Articles%22,%22Disease%20of%20the%20Week%22,%22FluView%20Summary%22,%22Vital%20Signs%22,%22Blogs%22,%22FastStats%22,%22Newsroom%22]&cardtype=["type-a1","type-a1","type-a1","type-a2","type-a2","type-a3","type-a3","type-b1","type-b2","type-c1","type-c2","type-c3","type-d1","type-d2","type-e1","type-e2"]';
    var feed = 'http://www.filltext.com/?rows=30&id={index}&title={lorem|10}&pretty=true&date={date}&description={lorem|40}&source=[%22Health%20Articles%22,%22Disease%20of%20the%20Week%22,%22FluView%22,%22Vital%20Signs%22,%22Blogs%22,%22FastStats%22,%22Newsroom%22,%22CDC Director%22,%22CDC Works for You 24-7%22,%22Public Health Matters%22,%22Weekly Disease Case Counts%22,%22Did You Know?%22,%22Fact of the Week%22,%22EID%22,%22MMWR%22,%22PCD%22,%22Outbreaks%22,%22Travel Notices%22,%22Image Library%22,%22Instagram%22,%22Flickr%22,%22Podcasts%22,%22YouTube CDC Director Briefing%22,%22YouTube CDC TV%22,%22YouTube All Other%22]&cardtype=[%22type-a1%22,%22type-a2%22,%22type-b1%22,%22type-b2%22,%22type-b3%22,%22type-c1%22,%22type-d1%22,%22type-d2%22,%22type-t1%22,%22type-t2%22,%22type-t3%22]';

    service.async = function() {
        $http({
            method: 'GET',
            url: feed,
            timeout: 5000
        }).
        // this callback will be called asynchronously
        // when the response is available.
        then(function(d) {
            data = d.data;  // was previously just d, the datasource changed

            var page = 1,
                pageitems = 10,
                source;

            for (var key in data) {

                if (typeof data[key].size === 'undefined') {
                    data[key].size = 'full';
                }

                source = data[key].source;

                // WARN: don't really match like this
                if (typeof source !== 'undefined') {
                    switch (source) {
                        case 'Disease of the Week':
                        case 'FluView':
                        case 'Health Articles':
                        case 'Vital Signs':
                            data[key].sourcetype = 'article';
                            break;
                        case 'CDC Director':
                        case 'CDC Works for You 24-7':
                        case 'Public Health Matters':
                            data[key].sourcetype = 'blog';
                            break;
                        case 'FastStats':
                        case 'Weekly Disease Case Counts':
                            data[key].sourcetype = 'data';
                            break;
                        case 'Did You Know?':
                        case 'Fact of the Week':
                            data[key].sourcetype = 'fact';
                            break;
                        case 'EID':
                        case 'MMWR':
                        case 'PCD':
                            data[key].sourcetype = 'journal';
                            break;
                        case 'Newsroom':
                        case 'Outbreaks':
                        case 'Travel Notices':
                            data[key].sourcetype = 'news';
                            break;
                        case 'Image Library':
                        case 'Instagram':
                        case 'Flickr':
                            data[key].sourcetype = 'photo';
                            break;
                        case 'Facebook':
                        case 'Google+':
                        case 'Pinterest':
                        case 'Twitter':
                            data[key].sourcetype = 'social';
                            break;
                        case 'Podcasts':
                        case 'YouTube CDC Director Briefing':
                        case 'YouTube CDC TV':
                        case 'YouTube All Other':
                            data[key].sourcetype = 'video';
                            break;
                    }
                }

                var previouscard = typeof data[key - 1] !== 'undefined' ? data[key - 1] : '';

                if (previouscard && previouscard.cardtype.indexOf('type-d') === 0) {
                    if (!previouscard.modified) {
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
                    data[key].image = 'http://placeimg.com/300/200/any/' + key;
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
            var position = getRandom(9, 4);
            data.splice(position, 0, facebookCard);

            position = getRandom(9, 4);
            data.splice(position, 0, twitterCard);

            position = getRandom(20, 8);
            data.splice(position, 0, pinterestCard);

            position = getRandom(20, 8);
            data.splice(position, 0, instagramCard);

            HomeStreamStorage.save(data);
            deferred.resolve();
        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        catch(function(response) {
            console.error('Homestream Error: ', response.status, response.data);
            data = HomeStreamStorage.all();
            deferred.reject();
        }).
        finally(function(){
            console.log('finally');
            console.log(data);
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
    };

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
        then(function(d) {
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
        catch(function(response) {
            console.error('Response Error: ', response.status, response.data);
            data = DotwStorage.all();
            deferred.reject();
        }).
        finally(function() {
            console.log('finally');
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
        then(function(d) {
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
        catch(function(response) {
            console.error('Response Error: ', response.status, response.data);
            data = HealthArticlesStorage.all();
            deferred.reject();
        }).
        finally(function() {
            console.log('finally');
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
        then(function(d) {
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

            VitalSignsStorage.save(data);
            deferred.resolve();
        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        catch(function(response) {
            console.error('Response Error: ', response.status, response.data);
            data = VitalSignsStorage.all();
            deferred.reject();
        }).
        finally(function() {
            console.log('finally');
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
    var videosUrl = apiUrl + 'playlistItems?part=snippet&key=' + youtubeKey + '&maxResults=' + 20;
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
        then(function(d) {
            result = d;
            data = result.items;
            deferred.resolve();
        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        catch(function(response) {
            console.error('Response Error: ', response.status, response.data);
            deferred.reject();
        }).
        finally(function() {
            console.log('finally');
        });

        return promise;

    };

    service.getPlaylistId = function() {
        var url = playlistsUrl + '&forUsername=' + username;

        return $http.get(url).then(function(response) {
            var items = response.data.items;
            if (items.length && items[0].contentDetails.relatedPlaylists.uploads) {
                return items[0].contentDetails.relatedPlaylists.uploads;
            }

            return null;
        });
    };

    service.getVideos = function() {
        return data;
    };

    service.getVideo = function(videoId) {
        return data[videoId];
    };

    return service;

})

.factory('GalleryData', function() {
    // newp
});
