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
	'angularMoment'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
			
		// Open any external link with InAppBrowser Plugin
		$(document).on('click', 'a[href^=http], a[href^=https]', function(e){

				e.preventDefault();
				var $this = $(this); 
				var target = $this.data('inAppBrowser') || '_blank';

				window.open($this.attr('href'), target);

		});
			
		// Initialize Push Notifications
		var initPushwoosh = function() {
				var pushNotification = window.plugins.pushNotification;

		if(device.platform == "Android") {
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

		.state('app', {
			url: "/app",
			abstract: true,
			templateUrl: "templates/menu.html",
			controller: 'AppCtrl'
		})

		.state('app.home', {
			url: "/home",
			views: {
				'menuContent' :{
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

		.state('app.typeface', {
			url: "/typeface",
			views: {
				'menuContent' :{
					templateUrl: "templates/home-typeface.html",
					controller: 'TypefaceCtrl'
				}
			}
		})		
		.state('app.cards', {
			url: "/cards",
			views: {
				'menuContent' :{
					templateUrl: "templates/cards.html",
					controller: 'CardsCtrl'
				}
			}
		})	

		.state('app.dotw', {
			url: "/dotw",
			views: {
				'menuContent' :{
					templateUrl: "templates/dotw.html",
					controller: 'DotwCtrl'
				}
			}
		})

		.state('app.disease', {
			url: "/disease/:newId",
			views: {
				'menuContent' :{
					templateUrl: "templates/disease.html",
					controller: 'DiseaseCtrl'
				}
			}
		})		
		
		.state('app.youtubevideos', {
			url: "/youtubevideos",
			views: {
				'menuContent' :{
					templateUrl: "templates/youtube-videos.html",
					controller: 'YouTubeVideosCtrl'
				}
			}
		})

		.state('app.youtubevideo', {
			url: "/youtubevideos/:videoId",
			views: {
				'menuContent' :{
					templateUrl: "templates/youtube-video.html",
					controller: 'YouTubeVideoCtrl'
				}
			}
		})

		.state('app.healtharticles', {
			url: "/healtharticles",
			views: {
				'menuContent' :{
					templateUrl: "templates/healtharticles.html",
					controller: 'HealthArticlesCtrl'
				}
			}
		})
		
		.state('app.plugins', {
			url: "/plugins",
			views: {
				'menuContent' :{
					templateUrl: "templates/plugins.html",
					controller: 'PluginsCtrl'
				}
			}
		})

		.state('app.device', {
			url: "/plugins/device",
			views: {
				'menuContent' :{
					templateUrl: "templates/plugins/device.html",
					controller: 'DeviceCtrl'
				}
			}
		})

		.state('app.notifications', {
			url: "/plugins/notifications",
			views: {
				'menuContent' :{
					templateUrl: "templates/plugins/notifications.html",
					controller: 'NotificationsCtrl'
				}
			}
		})

		.state('app.settings', {
			url: "/settings",
			views: {
				'menuContent' :{
					templateUrl: "templates/settings.html",
					controller: 'SettingsCtrl'
				}
			}
		})

		.state('app.grid', {
			url: "/grid",
			views: {
				'menuContent' :{
					templateUrl: "templates/grid.html",
					controller: 'GenericCtrl'
				}
			}
		})		

		.state('app.guided-quiz', {
			url: "/guided-quiz",
			views: {
				'menuContent' :{
					templateUrl: "templates/guided-quiz.html",
					controller: 'GuidedQuizCtrl'
				}
			}
		})
		.state('app.form-quiz', {
			url: "/form-quiz",
			views: {
				'menuContent' :{
					templateUrl: "templates/form-quiz.html",
					controller: 'FormQuizCtrl'
				}
			}
		})
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/home');
});