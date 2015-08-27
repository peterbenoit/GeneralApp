angular.module('cdcgeneralapp.controllers', [])

// Home Controller
.controller('HomeCtrl', function($scope, Data) {
	$scope.items = Data.items;

	$scope.isNews = function(title) {
		return (title.hasOwnProperty('title') && title.title === "News");
	}

	$scope.toIntro = function() {
		$state.go('intro');
	}
})

// Does nothing, just a placeholder for pages that don't need a controller
.controller('GenericCtrl', function($scope) {

})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

	// Called to navigate to the main app
	$scope.startApp = function() {
		$state.go('app.home');
	};
	$scope.next = function() {
		$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function() {
		$ionicSlideBoxDelegate.previous();
	};

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
	};
})

// Home Stream Controller
.controller('HomeStreamCtrl', function($scope, $ionicLoading, HomeStreamData, HomeStreamStorage) {
	$scope.homestream = [];
	$scope.storage = '';

	$scope.selectTemplate = function(stream) {
		var templateId = stream.cardtype.replace('type-', '');
		return $scope.template[templateId];
	};

	$scope.template = {
		"a1": "templates/cards/a1.html",
		"a2": "templates/cards/a2.html",
		"a3": "templates/cards/a3.html",
		"b1": "templates/cards/b1.html",
		"b2": "templates/cards/b2.html",
		"c1": "templates/cards/c1.html",
		"c2": "templates/cards/c2.html",
		"c3": "templates/cards/c3.html",
		"d1": "templates/cards/d1.html",
		"d2": "templates/cards/d2.html",
		"e1": "templates/cards/e1.html",
		"e2": "templates/cards/e2.html",
		"social": "templates/cards/social.html",
	}

	$scope.loading = $ionicLoading.show({
		template: '<ion-spinner icon="spiral"></ion-spinner>',

		//Will a dark overlay or backdrop cover the entire view
		showBackdrop: false,

		// The delay in showing the indicator
		showDelay: 10
	});

	var getData = function() {
		HomeStreamData.async().then(
			// successCallback
			function() {
				$scope.homestream = HomeStreamData.getAll();
				$scope.$broadcast('scroll.refreshComplete');
				$ionicLoading.hide();
			},
			// errorCallback 
			function() {
				$scope.homestream = HomeStreamStorage.all();
				$scope.storage = 'Data from local storage';
				$scope.$broadcast('scroll.refreshComplete');
				$ionicLoading.hide();
			},
			// notifyCallback
			function() {}
		);
	}

	getData();

	$scope.doRefresh = function() {
		console.log('Home Stream Load');
		getData();
	}

	var page = 1;
	// Define the number of the posts in the page
	var pageSize = 10;

	$scope.paginationLimit = function(data) {
		return pageSize * page;
	};

	$scope.hasMoreItems = function() {
		// return page < ($scope.videos.length / pageSize);
		return true;
	};

	$scope.showMoreItems = function() {
		page = page + 1;
		// $scope.$apply();
	};	
})

// Source Stream Controller
.controller('StreamCtrl', function($scope, $stateParams, HomeStreamData, $sce) {
	$scope.sourcestream = [];
	$scope.storage = '';

	$scope.sourcestream = HomeStreamData.getBySource($stateParams.entryId);
	

	// $scope.content = $sce.trustAsHtml($scope.entry.content);	

	$scope.selectTemplate = function(sourcestream) {
		var templateId = sourcestream.cardtype.replace('type-', '');
		return $scope.template[templateId];
	};

	$scope.template = {
		"a1": "templates/cards/a1.html",
		"a2": "templates/cards/a2.html",
		"a3": "templates/cards/a3.html",
		"b1": "templates/cards/b1.html",
		"b2": "templates/cards/b2.html",
		"c1": "templates/cards/c1.html",
		"c2": "templates/cards/c2.html",
		"c3": "templates/cards/c3.html",
		"d1": "templates/cards/d1.html",
		"d2": "templates/cards/d2.html",
		"e1": "templates/cards/e1.html",
		"e2": "templates/cards/e2.html",
		"social": "templates/cards/social.html",
	}

	// $scope.loading = $ionicLoading.show({
	// 	template: '<ion-spinner icon="spiral"></ion-spinner>',

	// 	//Will a dark overlay or backdrop cover the entire view
	// 	showBackdrop: false,

	// 	// The delay in showing the indicator
	// 	showDelay: 10
	// });

	// var getData = function() {
	// 	StreamData.async().then(
	// 		// successCallback
	// 		function() {
	// 			$scope.sourcestream = StreamData.getAll();
	// 			$scope.$broadcast('scroll.refreshComplete');
	// 			$ionicLoading.hide();
	// 		},
	// 		// errorCallback 
	// 		function() {
	// 			$scope.sourcestream = StreamStorage.all();
	// 			$scope.storage = 'Data from local storage';
	// 			$scope.$broadcast('scroll.refreshComplete');
	// 			$ionicLoading.hide();
	// 		},
	// 		// notifyCallback
	// 		function() {}
	// 	);
	// }

	// getData();

	// $scope.doRefresh = function() {
	// 	console.log('Source Stream Load');
	// 	getData();
	// }
})

// Typeface Controller
.controller('TypefaceCtrl', function($scope, Data) {
	// $scope.items = Data.items;
})
// Cards Controller
.controller('CardsCtrl', function($scope, Data) {
	// $scope.items = Data.items;
})

// DOTW Controller
.controller('DotwCtrl', function($scope, $ionicLoading, HomeStreamData, DotwStorage) {

	$scope.news = [];
	$scope.storage = '';

	$scope.loading = $ionicLoading.show({
		template: '<ion-spinner icon="spiral"></ion-spinner> Loading Data',

		//Will a dark overlay or backdrop cover the entire view
		showBackdrop: false,

		// The delay in showing the indicator
		showDelay: 10
	});

	DotwData.async().then(
		// successCallback
		function() {
			$scope.diseases = DotwData.getAll();
			$ionicLoading.hide();
		},
		// errorCallback 
		function() {
			$scope.diseases = DotwStorage.all();
			$scope.storage = 'Data from local storage';
			$ionicLoading.hide();
		},
		// notifyCallback
		function() {}
	);
})

// Disease Controller
.controller('DiseaseCtrl', function($scope, $stateParams, DiseaseData) {

	$scope.new = NewsData.get($stateParams.newId);

})

.controller("GalleryCtrl", function($scope, $ionicLoading) {
	var page = 1;
	// Define the number of the feed results in the page
	var pageSize = 10,
		imageSize;

	$scope.images = [];	

	$scope.loading = $ionicLoading.show({
		template: '<ion-spinner icon="spiral"></ion-spinner>',

		//Will a dark overlay or backdrop cover the entire view
		showBackdrop: false,

		// The delay in showing the indicator
		showDelay: 10
	});	

	$scope.loadImages = function(size) {
		if (!size) {
			return;
		}
		imageSize = size;
		for (var i = 0; i < pageSize; i++) {
			$scope.images.push({
				id: i,
				src: "http://placeimg.com/" + imageSize + "/any/" + i
			});
		}
		$ionicLoading.hide();
	}

	$scope.loadMoreItems = function() {
		$ionicLoading.show({template: '<ion-spinner icon="spiral"></ion-spinner>',showBackdrop: false,showDelay: 10});
		
		for (var i = 0; i < pageSize; i++) {
			$scope.images.push({
				id: i,
				src: "http://placeimg.com/" + imageSize + "/any/" + i
			});
		}
		showMoreItems();
	}

	$scope.paginationLimit = function(data) {
		return pageSize * page;
	};

	$scope.hasMoreItems = function() {
		return true; //page < ($scope.feeds.length / pageSize);
	};

	var showMoreItems = function() {
		page = page + 1;
		// $scope.$apply();
		$ionicLoading.hide();
	}; 	
})

// Health Articles Controller
.controller('HealthArticlesCtrl', function($scope, $ionicLoading, HealthArticlesData, HealthArticlesStorage) {

	$scope.healtharticles = [];
	$scope.storage = '';

	$scope.loading = $ionicLoading.show({
		template: '<ion-spinner icon="spiral"></ion-spinner> Loading Data',

		//Will a dark overlay or backdrop cover the entire view
		showBackdrop: false,

		// The delay in showing the indicator
		showDelay: 10
	});

	HealthArticlesData.async().then(
		// successCallback
		function() {
			$scope.healtharticles = HealthArticlesData.getAll();
			$scope.letterLimit = HealthArticlesData.getLetterLimit();
			$ionicLoading.hide();
		},
		// errorCallback 
		function() {
			$scope.healtharticles = HealthArticlesStorage.all();
			$scope.letterLimit = HealthArticlesData.getLetterLimit();
			$scope.storage = 'Data from local storage';
			$ionicLoading.hide();
		},
		// notifyCallback
		function() {}
	);

})

// Plugins Controller
.controller('PluginsCtrl', function($scope, PluginsData) {
	$scope.items = PluginsData.items;
})

// Device Controller
.controller('DeviceCtrl', function($scope) {
	$scope.device = device;
})

// Notifications Controller
.controller('NotificationsCtrl', function($scope) {

	$scope.alertNotify = function() {
		navigator.notification.alert("Sample Alert", function() {
			console.log("Alert success")
		}, "My Alert", "Close");
	};

	$scope.beepNotify = function() {
		navigator.notification.beep(1);
	};

	$scope.vibrateNotify = function() {
		navigator.notification.vibrate(3000);
	};

	$scope.confirmNotify = function() {
		navigator.notification.confirm("My Confirmation", function() {
			console.log("Confirm Success")
		}, "Are you sure?", ["Ok", "Cancel"]);
	};

})

// Settings Controller
.controller('SettingsCtrl', function($scope, SettingsStorage, NewsStorage, ProductsStorage, AboutStorage, FeedsStorage, PostsStorage, ServerPostsStorage) {

	$scope.settings = SettingsStorage.all();

	$scope.saveSettings = function() {
		SettingsStorage.save($scope.settings);
	};

	$scope.$watch('settings', function() {
		SettingsStorage.save($scope.settings)
	}, true);

	$scope.resetSettings = function() {
		SettingsStorage.clear();
		$scope.settings = SettingsStorage.all();
	};

	$scope.resetNewsStorage = function() {
		NewsStorage.clear();
	};

	$scope.resetProductsStorage = function() {
		ProductsStorage.clear();
	};

	$scope.resetAboutStorage = function() {
		AboutStorage.clear();
	};

	$scope.resetFeedsStorage = function() {
		FeedsStorage.clear();
	};

	$scope.resetPostsStorage = function() {
		PostsStorage.clear();
	};

	$scope.resetServerPostsStorage = function() {
		ServerPostsStorage.clear();
	};

})

// Menu Controller (amongst other things...)
.controller('AppCtrl', function($scope, $ionicModal, $timeout, MenuData, $ionicActionSheet) {

	$scope.items = MenuData.items;

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	// $ionicModal.fromTemplateUrl('templates/login.html', {
	// 	scope: $scope
	// }).then(function(modal) {
	// 	$scope.modal = modal;
	// });

	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
		$scope.modal.hide();
	},

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
			$scope.closeLogin();
		}, 1000);
	};

	// Triggered on a button click, or some other target
	$scope.show = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [{
				text: '<b>Share</b> This'
			}, {
				text: 'Move'
			}],
			destructiveText: 'Delete',
			titleText: 'Modify your album',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				return true;
			}
		});

	};

})

// YouTube Videos Controller
.controller('YouTubeVideosCtrl', function($scope, $ionicLoading, YouTubeData) {

	$scope.videos = [];

	$scope.loading = $ionicLoading.show({
		template: '<ion-spinner icon="spiral"></ion-spinner> Loading Data',

		//Will a dark overlay or backdrop cover the entire view
		showBackdrop: false,

		// The delay in showing the indicator
		showDelay: 10
	});

	var getData = function() {

		YouTubeData.async().then(
			// successCallback
			function() {
				$scope.videos = YouTubeData.getVideos();
				console.log($scope.videos);
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			},
			// errorCallback 
			function() {
				$ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
			},
			// notifyCallback
			function() {}
		);
	}

	getData();

	var page = 1;
	// Define the number of the posts in the page
	var pageSize = 6;

	$scope.doRefresh = function() {
		getData();
	}

	$scope.paginationLimit = function(data) {
		return pageSize * page;
	};

	$scope.hasMoreItems = function() {
		return page < ($scope.videos.length / pageSize);
	};

	$scope.showMoreItems = function() {
		page = page + 1;
	};
})

// YouTube Video Controller
.controller('YouTubeVideoCtrl', function($scope, $stateParams, YouTubeData, $sce) {
	$scope.video = {};
	$scope.video = YouTubeData.getVideo($stateParams.videoId);

	$scope.content = $sce.trustAsHtml($scope.video.snippet.description);

	$scope.getVideoUrl = function() {
		var videoUrl = 'http://www.youtube.com/embed/' + $scope.video.snippet.resourceId.videoId;
		return $sce.trustAsResourceUrl(videoUrl);
	}

	$scope.shareVideo = function() {

		var subject = $scope.video.snippet.title;
		var message = $scope.video.snippet.description;
		message = message.replace(/(<([^>]+)>)/ig, "");

		var link = 'http://www.youtube.com/embed/' + $scope.video.snippet.resourceId.videoId;

		//Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
		//window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
		window.plugins.socialsharing.share(message, subject, null, link);
	}

})

.controller('FormQuizCtrl', function($scope, Data, $window) {
	$scope.$on("$ionicView.loaded", function() {
		// setTimeout(function() {
		// 	console.log('form')
		// 	var script = document.createElement('script');
		// 	script.type = 'text/javascript';
		// 	script.src = 'http://www.cdc.gov/TemplatePackage/contrib/widgets/tp-widget-external-loader.js';
		// 	document.body.appendChild(script);
		// 	$window.CDC.Widget.Loader.init(true);
		// },500);
	});
})
	.controller('GuidedQuizCtrl', function($scope, Data, $window) {
		$scope.$on("$ionicView.loaded", function() {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'http://www.cdc.gov/TemplatePackage/contrib/widgets/tp-widget-external-loader.js';
			document.body.appendChild(script);
		});
	})