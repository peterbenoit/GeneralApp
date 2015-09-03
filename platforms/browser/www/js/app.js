// CDCGeneralApp: Mobile Ionic Framework

angular.module('cdcgeneralapp', [
	'ionic',
	'cdcgeneralapp.controllers',
	'cdcgeneralapp.data',
	'cdcgeneralapp.directives',
	'cdcgeneralapp.filters',
	'cdcgeneralapp.storage',
	'ngSanitize',
	'angular.filter',
	'angularMoment',
	'ngCordova'
])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}

		// Open any external link with InAppBrowser Plugin
		$(document).on('click', '[href^=http], [href^=https]', function(e) {
			// window.open(‘http://example.com’, ‘_system’);	Loads in the system browser
			// window.open(‘http://example.com’, ‘_blank’);		Loads in the InAppBrowser
			// window.open(‘http://example.com’, ‘_blank’, ‘location=no’);	Loads in the InAppBrowser with no location bar
			// window.open(‘http://example.com’, ‘_self’);	Loads in the Cordova web view
			e.preventDefault();
			var t = $(this),
				href = t.attr('href');

			target = t.data('inAppBrowser') || '_blank';	//TODO: self stopped working

			var ref = window.open(href, target, 'location=no');

			//TODO: not working in iOS
			if(href.indexOf('cdc.gov') >= 0) {
				ref.addEventListener('loadstop', function() {
					ref.insertCSS({
						code: "header#header { display: none; }footer#footer {display:none} div#socialMediaShareContainer.dd {display:none}"
					});
				});
			}
		});

		// Initialize Push Notifications
		var initPushwoosh = function() {
			var pushNotification = window.plugins.pushNotification;

			if (device.platform == "Android") {
				registerPushwooshAndroid();
			}
			if (device.platform == "iPhone" || device.platform == "iOS") {
				registerPushwooshIOS();
			}
		}

		// Uncomment the following initialization when you have made the appropriate configuration for iOS - http://goo.gl/YKQL8k and for Android - http://goo.gl/SPGWDJ
		// initPushwoosh();

	});

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	// $ionicConfigProvider
	// http://ionicframework.com/docs/api/provider/%24ionicConfigProvider/
	$ionicConfigProvider.tabs.position('bottom');
	$ionicConfigProvider.navBar.alignTitle('center');

	$stateProvider

	.state('intro', {
		url: '/',
		templateUrl: 'templates/intro.html',
		controller: 'IntroCtrl'
	})

	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu.html",
		controller: 'AppCtrl'
	})

	.state('app.home', {
		url: "/home",
		views: {
			'menuContent': {
				// templateUrl: "templates/home-typeface.html",
				// templateUrl: "templates/home-grid-2b.html",
				// templateUrl: "templates/home-grid-2.html",
				// templateUrl: "templates/home-grid-3.html",
				// templateUrl: "templates/home-rows.html",
				templateUrl: "templates/home-stream-phone-portrait.html",
				// controller: 'HomeCtrl'
				controller: 'HomeStreamCtrl'
			}
		}
	})

	.state('app.source', {
		url: "/source/:entryId",
		views: {
			'menuContent' :{
				templateUrl: "templates/source-stream.html",
				controller: 'StreamCtrl'
			}
		}
	})	

	.state('app.typeface', {
		url: "/typeface",
		views: {
			'menuContent': {
				templateUrl: "templates/home-typeface.html",
				controller: 'TypefaceCtrl'
			}
		}
	})

	.state('app.galleryfour', {
		url: "/galleryfour",
		views: {
			'menuContent': {
				templateUrl: "templates/gallery4.html",
				controller: 'GalleryCtrl'
			}
		}
	})
	.state('app.gallerythree', {
		url: "/gallerythree",
		views: {
			'menuContent': {
				templateUrl: "templates/gallery3.html",
				controller: 'GalleryCtrl'
			}
		}
	})
	.state('app.gallerytwo', {
		url: "/gallerytwo",
		views: {
			'menuContent': {
				templateUrl: "templates/gallery2.html",
				controller: 'GalleryCtrl'
			}
		}
	})
	.state('app.cards', {
		url: "/cards",
		views: {
			'menuContent': {
				templateUrl: "templates/cards.html",
				controller: 'CardsCtrl'
			}
		}
	})

	.state('app.dotw', {
		url: "/dotw",
		views: {
			'menuContent': {
				templateUrl: "templates/dotw.html",
				controller: 'DotwCtrl'
			}
		}
	})

	.state('app.disease', {
		url: "/disease/:newId",
		views: {
			'menuContent': {
				templateUrl: "templates/disease.html",
				controller: 'DiseaseCtrl'
			}
		}
	})

	.state('app.youtubevideos', {
		url: "/youtubevideos",
		views: {
			'menuContent': {
				templateUrl: "templates/youtube-videos.html",
				controller: 'YouTubeVideosCtrl'
			}
		}
	})

	.state('app.youtubevideo', {
		url: "/youtubevideos/:videoId",
		views: {
			'menuContent': {
				templateUrl: "templates/youtube-video.html",
				controller: 'YouTubeVideoCtrl'
			}
		}
	})

	.state('app.healtharticles', {
		url: "/healtharticles",
		views: {
			'menuContent': {
				templateUrl: "templates/health-articles.html",
				controller: 'HealthArticlesCtrl'
			}
		}
	})

	.state('app.healtharticle', {
		url: "/healtharticle/:entryId",
		views: {
			'menuContent': {
				templateUrl: "templates/health-article.html",
				controller: 'HealthArticlesCtrl'
			}
		}
	})

	.state('app.vitalsigns', {
		url: "/vitalsigns",
		views: {
			'menuContent': {
				templateUrl: "templates/vital-signs.html",
				controller: 'VitalSignsCtrl'
			}
		}
	})

	.state('app.vitalsign', {
		url: "/vitalsign/:entryId",
		views: {
			'menuContent': {
				templateUrl: "templates/vital-sign.html",
				controller: 'VitalSignsCtrl'
			}
		}
	})

	.state('app.plugins', {
		url: "/plugins",
		views: {
			'menuContent': {
				templateUrl: "templates/plugins.html",
				controller: 'PluginsCtrl'
			}
		}
	})

	.state('app.device', {
		url: "/plugins/device",
		views: {
			'menuContent': {
				templateUrl: "templates/plugins/device.html",
				controller: 'DeviceCtrl'
			}
		}
	})

	.state('app.notifications', {
		url: "/plugins/notifications",
		views: {
			'menuContent': {
				templateUrl: "templates/plugins/notifications.html",
				controller: 'NotificationsCtrl'
			}
		}
	})

	.state('app.settings', {
		url: "/settings",
		views: {
			'menuContent': {
				templateUrl: "templates/settings.html",
				controller: 'SettingsCtrl'
			}
		}
	})

	.state('app.grid', {
		url: "/grid",
		views: {
			'menuContent': {
				templateUrl: "templates/grid.html",
				controller: 'GenericCtrl'
			}
		}
	})

	.state('app.guided-quiz', {
		url: "/guided-quiz",
		views: {
			'menuContent': {
				templateUrl: "templates/guided-quiz.html",
				controller: 'GuidedQuizCtrl'
			}
		}
	})

	.state('app.form-quiz', {
		url: "/form-quiz",
		views: {
			'menuContent': {
				templateUrl: "templates/form-quiz.html",
				controller: 'FormQuizCtrl'
			}
		}
	})
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/home');	// /app/home
});