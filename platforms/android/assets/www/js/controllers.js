angular.module('cdcgeneralapp.controllers', [])

// Home Controller
.controller('HomeCtrl', function($scope, Data, $cordovaFile) {
    console.log('HomeCtrl');
    $scope.items = Data.items;

    $scope.isNews = function(title) {
        return (title.hasOwnProperty('title') && title.title === 'News');
    };

    $scope.toIntro = function() {
        $state.go('intro');
    };
})

// Does nothing, just a placeholder for pages that don't need a controller
.controller('GenericCtrl', function($scope) {

})

.controller('PodcastsCtrl', function($scope) {

})

.controller('PodcastCtrl', function($scope) {

})

// load external URLs into the iframe
.controller('ExternalCtrl', function($scope, $routeParams, $stateParams, $sce) {
    // NOTE: I'm currently replacing slashes with pipes in hrefs, so they'll pass angular, and then converting back
    var url = $stateParams.url.split('|').join('/');

    $scope.frameUrl = $sce.trustAsResourceUrl(url);
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
    console.log('IntroCtrl');

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
.controller('HomeStreamCtrl', function($scope, $rootScope, $q, $http, $ionicLoading, HomeStreamData, HomeStreamStorage, MenuStorage, $cordovaFile, $cordovaDevice) {
    console.log('HomeStreamCtrl');
    $scope.homestream = [];
    $scope.storage = '';
    $scope.othervideos = true;
    $scope.dotw = true;

    var deferred = $q.defer(),
        promise = deferred.promise,
        data = [],
        service = {},
        feed = 'http://codepen.io/peterbenoit/pen/MajGzE.js',
        arr;

    $http({
        method: 'GET',
        url: feed,
        timeout: 5000
    }).
    then(function(d) {
        data = d;

        console.log('Updating Application Configuration Data: ', data);

        //TODO: This will overwrite the selected options, specifically the checked value. There should be another way to handle this.


        // do something with data
        MenuStorage.save(data);
        deferred.resolve();
    }).
    catch(function() {
        data = MenuStorage.all();
        deferred.reject();
    }).
    finally(function() {
        $rootScope.menu = data;
        $ionicLoading.hide();
        setupSources();
    });

    var setupSources = function() {
        // arr = $scope.menu.data.sources;




        // just simple matching menu selections to to mainscreen
        // arr.forEach(function(element, index, array){
        //     if(element.title == "Other Videos") {
        //         $scope.othervideos = element.checked;
        //     }
        //     if(element.title == "Disease of the Week") {
        //         $scope.dotw = element.checked;
        //     }
        //     if(element.title == "Podcasts") {
        //         $scope.podcasts = element.checked;
        //     }
        // });

        // $scope.$watch('menu', function() {
        //     selectCard();
        // }, true);
    };



    // var selectCard = function(hi) {
    //     arr.forEach(function(element, index, array){
    //         if(element.title == "Other Videos") {
    //             $scope.othervideos = element.checked;
    //         }
    //         if(element.title == "Disease of the Week") {
    //             $scope.dotw = element.checked;
    //         }
    //     });
    // }

    $scope.selectTemplate = function(stream) {
        var templateId = stream.cardtype.replace('type-', '');
        return $scope.template[templateId];
    };

    if (window.cordova) {
        $cordovaFile.getFreeDiskSpace()
            .then(function(success) {
                console.log('free space: ', success);
            }, function(error) {
                console.log('getFreeDiskSpace error: ', error);
        });
    }

    $rootScope.template = {
        'a1': 'templates/cards/a1.html',
        'a2': 'templates/cards/a2.html',
        'b1': 'templates/cards/b1.html',
        'b2': 'templates/cards/b2.html',
        'b3': 'templates/cards/b3.html',
        'c1': 'templates/cards/c1.html',
        'd1': 'templates/cards/d1.html',
        'd2': 'templates/cards/d2.html',
        'e1': 'templates/cards/e1.html',
        'e2': 'templates/cards/e2.html',
        'social-left': 'templates/cards/social-left.html',
        'social-right': 'templates/cards/social-right.html',
        'social-top': 'templates/cards/social-top.html',
        't1': 'templates/cards/t1a.html',
        't2': 'templates/cards/t2a.html',
        't3': 'templates/cards/t3a.html'
    };

    $scope.loading = $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner>',

        //Will a dark overlay or backdrop cover the entire view
        showBackdrop: false,

        // The delay in showing the indicator
        showDelay: 100
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
    };

    getData();

    $scope.doRefresh = function() {
        console.log('Home Stream Load');
        getData();
    };

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
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    };

    // $scope.goTo = function(url) {
    //  alert(url)
    //  // window.open(url, '_self', 'location=no');
    //  // window.open(t.attr('href'), target, 'location=no');
    // }
})

// Source Stream Controller
// currently this only works off what was loaded in the Home Stream and not a fresh load
// home stream may only load a limited set, whereas this view will need to try to display 10 at a time
.controller('StreamCtrl', function($scope, $rootScope, $stateParams, HomeStreamData, $sce) {
    $scope.sourcestream = [];
    $scope.storage = '';

    $scope.sourcestream = HomeStreamData.getBySource($stateParams.entryId);

    $scope.title = function() {
        return $stateParams.entryId;
    };

    // $scope.content = $sce.trustAsHtml($scope.entry.content);

    $scope.selectTemplate = function(sourcestream) {
        var templateId = sourcestream.cardtype.replace('type-', '');
        return $rootScope.template[templateId];
    };

    // $scope.template = {
    //  "a1": "templates/cards/a1.html",
    //  "a2": "templates/cards/a2.html",
    //  "a3": "templates/cards/a3.html",
    //  "b1": "templates/cards/b1.html",
    //  "b2": "templates/cards/b2.html",
    //  "c1": "templates/cards/c1.html",
    //  "c2": "templates/cards/c2.html",
    //  "c3": "templates/cards/c3.html",
    //  "d1": "templates/cards/d1.html",
    //  "d2": "templates/cards/d2.html",
    //  "e1": "templates/cards/e1.html",
    //  "e2": "templates/cards/e2.html",
    //  "social": "templates/cards/social.html",
    // }

    // $scope.loading = $ionicLoading.show({
    //  template: '<ion-spinner icon="spiral"></ion-spinner>',

    //  //Will a dark overlay or backdrop cover the entire view
    //  showBackdrop: false,

    //  // The delay in showing the indicator
    //  showDelay: 100
    // });

    // var getData = function() {
    //  StreamData.async().then(
    //      // successCallback
    //      function() {
    //          $scope.sourcestream = StreamData.getAll();
    //          $scope.$broadcast('scroll.refreshComplete');
    //          $ionicLoading.hide();
    //      },
    //      // errorCallback
    //      function() {
    //          $scope.sourcestream = StreamStorage.all();
    //          $scope.storage = 'Data from local storage';
    //          $scope.$broadcast('scroll.refreshComplete');
    //          $ionicLoading.hide();
    //      },
    //      // notifyCallback
    //      function() {}
    //  );
    // }

    // getData();

    // $scope.doRefresh = function() {
    //  console.log('Source Stream Load');
    //  getData();
    // }
})

.controller('CardCtrl', function($scope) {

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
.controller('DotwCtrl', function($scope, $ionicLoading, DotwStreamData, DotwStorage) {

    $scope.diseases = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner> Loading Data',

        //Will a dark overlay or backdrop cover the entire view
        showBackdrop: false,

        // The delay in showing the indicator
        showDelay: 100
    });

    var getData = function() {

        DotwStreamData.async().then(
            // successCallback
            function() {
                $scope.diseases = DotwStreamData.getAll();
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            },
            // errorCallback
            function() {
            $scope.diseases = DotwStorage.all();
            $scope.storage = 'Data from local storage';
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            },
            // notifyCallback
            function() {}
        );
    };

    getData();

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 6;

    $scope.doRefresh = function() {
        getData();
    };

    $scope.paginationLimit = function(data) {
        return pageSize * page;
    };

    $scope.hasMoreItems = function() {
        return page < ($scope.diseases.length / pageSize);
    };

    $scope.showMoreItems = function() {
        page = page + 1;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    };
})

// Disease Controller
.controller('DiseaseCtrl', function($scope, $ionicPlatform, $stateParams, DotwStreamData, $sce) {
    $scope.disease = {};
    $scope.disease = DotwStreamData.get($stateParams.newId);

    console.log($scope.disease);

    $scope.content = $sce.trustAsHtml($scope.disease.description);
})

.controller('GalleryCtrl', function($scope, $ionicLoading) {
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
        showDelay: 100
    });

    $scope.loadImages = function(size) {
        if (!size) {
            return;
        }
        imageSize = size;
        for (var i = 0; i < pageSize; i++) {
            $scope.images.push({
                id: i,
                src: 'http://placeimg.com/' + imageSize + '/any/' + i
            });
        }
        $ionicLoading.hide();
    };

    $scope.loadMoreItems = function() {
        $ionicLoading.show({template: '<ion-spinner icon="spiral"></ion-spinner>', showBackdrop: false, showDelay: 100});

        for (var i = 0; i < pageSize; i++) {
            $scope.images.push({
                id: i,
                src: 'http://placeimg.com/' + imageSize + '/any/' + i
            });
        }
        showMoreItems();
    };

    $scope.paginationLimit = function(data) {
        return pageSize * page;
    };

    $scope.hasMoreItems = function() {
        return true; //page < ($scope.feeds.length / pageSize);
    };

    var showMoreItems = function() {
        page = page + 1;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
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
        showDelay: 100
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

.controller('HealthArticleCtrl', function($scope, $ionicPlatform, $stateParams, HealthArticlesData, $sce, FindAllURLsInText) {
    $scope.article = {};

    $scope.content = $sce.trustAsHtml($scope.article.description);
})

// Vital Signs Controller
.controller('VitalSignsCtrl', function($scope, $ionicLoading, VitalSignsData, VitalSignsStorage) {

    $scope.vitalsigns = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
        template: '<ion-spinner icon="spiral"></ion-spinner> Loading Data',

        //Will a dark overlay or backdrop cover the entire view
        showBackdrop: false,

        // The delay in showing the indicator
        showDelay: 100
    });

    VitalSignsData.async().then(
        // successCallback
        function() {
            $scope.vitalsigns = VitalSignsData.getAll();
            $scope.letterLimit = VitalSignsData.getLetterLimit();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.vitalsigns = VitalSignsStorage.all();
            $scope.letterLimit = VitalSignsData.getLetterLimit();
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
        navigator.notification.alert('Sample Alert', function() {
            console.log('Alert success');
        }, 'My Alert', 'Close');
    };

    $scope.beepNotify = function() {
        navigator.notification.beep(1);
    };

    $scope.vibrateNotify = function() {
        navigator.notification.vibrate(3000);
    };

    $scope.confirmNotify = function() {
        navigator.notification.confirm('My Confirmation', function() {
            console.log('Confirm Success');
        }, 'Are you sure?', ['Ok', 'Cancel']);
    };

})

// Settings Controller
.controller('SettingsCtrl', function($scope, SettingsStorage) {

    $scope.settings = SettingsStorage.all();

    $scope.saveSettings = function() {
        SettingsStorage.save($scope.settings);
    };

    $scope.$watch('settings', function() {
        SettingsStorage.save($scope.settings);
    }, true);

    $scope.resetSettings = function() {
        SettingsStorage.clear();
        $scope.settings = SettingsStorage.all();
    };
})

// Menu Data Controller (amongst other things...)
.controller('AppCtrl', function($scope, $ionicModal, $timeout, AppData, AppDataStorage, MenuStorage, $ionicActionSheet, $ionicLoading, $cordovaDevice) {
    console.log('AppCtrl Loaded');

    // WARN: preventing IOS from loading, maybe a permissions issue?
    if (window.cordova) {
        var device = $cordovaDevice.getDevice(),
            cordova = $cordovaDevice.getCordova(),
            model = $cordovaDevice.getModel(),
            platform = $cordovaDevice.getPlatform(),
            uuid = $cordovaDevice.getUUID(),
            version = $cordovaDevice.getVersion();

        alert(model)
    }

    // console.log("AppCtrl Menu Scope: ", $scope.menu);

    // $scope.saveMenu = function() {
    // console.log('AppCtrl.saveMenu');
    //     MenuStorage.save($scope.menu);
    // };

    $scope.$watch('menu', function() {
    console.log('AppCtrl.$watch');
        MenuStorage.save($scope.menu);
    }, true);

    // $scope.resetMenuStorage = function() {
    //     MenuStorage.clear();
    //     $scope.menu = MenuStorage.all();
    // };

    // AppData.async().then(
    //     // successCallback
    //     function() {
    //         console.log('new data: ', AppData.getAll());
    //         $ionicLoading.hide();
    //     },
    //     // errorCallback
    //     function() {
    //         console.log('old data: ', AppDataStorage.all());
    //         $scope.storage = 'Data from local storage';
    //         $ionicLoading.hide();
    //     },
    //     // notifyCallback
    //     function() {}
    // );

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
            titleText: '',
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
        showDelay: 100
    });

    var getData = function() {

        YouTubeData.async().then(
            // successCallback
            function() {
                $scope.videos = YouTubeData.getVideos();
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
    };

    getData();

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 6;

    $scope.doRefresh = function() {
        getData();
    };

    $scope.paginationLimit = function(data) {
        return pageSize * page;
    };

    $scope.hasMoreItems = function() {
        return page < ($scope.videos.length / pageSize);
    };

    $scope.showMoreItems = function() {
        page = page + 1;
        if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
            $scope.$apply();
        }
    };
})

// YouTube Video Controller
.controller('YouTubeVideoCtrl', function($scope, $ionicPlatform, $stateParams, YouTubeData, $sce, FindAllURLsInText) {
    $scope.video = {};
    $scope.video = YouTubeData.getVideo($stateParams.videoId);

    $scope.content = $sce.trustAsHtml($scope.video.description);

    $scope.id = $scope.video.sourceUrl.split('?v=')[1];

// console.log(FindAllURLsInText($scope.video.description));

    $scope.viewOnCDC = function() {
        // var urlarray = findAllURLsInText($scope.video.description),
        // cdcVideos = 'http://streaming.cdc.gov/vod.php';

        // if(urlarray.length) {
        //  urlarray.forEach(function(entry){
        //      if(entry.indexOf(cdcVideos) > -1) {
        //          window.open(entry, '_blank', 'location=no');
        //          return;
        //      }
        //  });
        // }

        // if for some reason there isn't a CDC TV url in the description
        window.open('http://www.cdc.gov/cdctv/', '_blank', 'location=no');
    };

    $scope.swipeLeft = function() {
        // alert('left');
    };

    $scope.getVideoUrl = function() {
        var videoUrl = 'http://www.youtube.com/embed/' + $scope.video.sourceUrl.split('?v=')[1];
        return $sce.trustAsResourceUrl(videoUrl);
    };

    $scope.shareVideo = function() {

        var subject = $scope.video.name;
        var message = $scope.video.description;
        message = message.replace(/(<([^>]+)>)/ig, '');

        var link = 'http://www.youtube.com/embed/' + $scope.video.sourceUrl.split('?v=')[1];

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        // as with most plugins, does not work in browser
        if (window.plugins) {
            window.plugins.socialsharing.share(message, subject, null, link);
        }
        else {
            alert('Only available in an App installed on a Device');
        }
    };
})

.controller('FormQuizCtrl', function($scope, Data, $window) {
    $scope.$on('$ionicView.loaded', function() {
        // setTimeout(function() {
        //  console.log('form')
        //  var script = document.createElement('script');
        //  script.type = 'text/javascript';
        //  script.src = 'http://www.cdc.gov/TemplatePackage/contrib/widgets/tp-widget-external-loader.js';
        //  document.body.appendChild(script);
        //  $window.CDC.Widget.Loader.init(true);
        // },500);
    });
})
    .controller('GuidedQuizCtrl', function($scope, Data, $window) {
        $scope.$on('$ionicView.loaded', function() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'http://www.cdc.gov/TemplatePackage/contrib/widgets/tp-widget-external-loader.js';
            document.body.appendChild(script);
        });
    });
