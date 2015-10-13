// CDCGeneralApp: Mobile Ionic Framework

var styles = {
    spam: 'color: #336699',
    please: 'color: #336699; font-weight: bold',
    emoji: function(emoji) {
        return "background-image: url('https://isitchristmas.com/emojis/' + emoji + '.png'); background-size: cover";
    }
};

window.ionic.Platform.ready(function() {
    // console.clear();
    angular.bootstrap(document, ['cdcgeneralapp']);
});

angular.module('cdcgeneralapp', [
    'ionic',
    'cdcgeneralapp.controllers',
    'cdcgeneralapp.data',
    'cdcgeneralapp.directives',
    'cdcgeneralapp.filters',
    'cdcgeneralapp.services',
    'cdcgeneralapp.storage',
    'ngSanitize',
    'angular.filter',
    'angularMoment',
    'ngCordova',
    'ngRoute'
])

.run(function($rootScope, $ionicPlatform, $ionicLoading) {

    $rootScope.$on('loading:show', function() {
        // $ionicLoading.show({template: 'wuteva'})
        // console.log('loading:show');
    });

    $rootScope.$on('loading:hide', function() {
        // $ionicLoading.hide()
        // console.log('loading:hide');
    });

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

        // haven't figured out how to apply this to controllers yet
        if (window.plugins) {
            window.plugins.toast.showShortTop('Loading YouTube Videos by Default.', function(a) {
                console.log('toast success: ' + a)}, function(b) {
                    alert('toast error: ' + b)});
        }

        // Open any EXTERNAL link with InAppBrowser Plugin
        $(document).on('click', '[href^=http], [href^=https]', function(e) {

            // window.open(‘http://example.com’, ‘_system’);    Loads in the system browser
            // window.open(‘http://example.com’, ‘_blank’);     Loads in the InAppBrowser
            // window.open(‘http://example.com’, ‘_blank’, ‘location=no’);  Loads in the InAppBrowser with no location bar
            // window.open(‘http://example.com’, ‘_self’);  Loads in the Cordova web view

            e.preventDefault();

            var t = $(this),
                href = t.attr('href'),
                browser = t.data('browser') || '_system';


                console.log(href);
                console.log(browser);
            var ref = window.open(href, browser, 'location=no');

            ref.addEventListener('loadstop', function() {
            // alert(ref);
            });

            //TODO: not working in iOS
            // if (href.indexOf('cdc.gov') >= 0) {
            //     ref.addEventListener('loadstop', function() {
            //         ref.insertCSS({
            //             code: 'header#header { display: none; }footer#footer {display:none} div#socialMediaShareContainer.dd {display:none}'
            //         });
            //     });
            // }
        });

        // Initialize Push Notifications
        var initPushwoosh = function() {
            var pushNotification = window.plugins.pushNotification;

            if (device.platform == 'Android') {
                registerPushwooshAndroid();
            }
            if (device.platform == 'iPhone' || device.platform == 'iOS') {
                registerPushwooshIOS();
            }
        };

        if (window.plugins) {
            initPushwoosh();
        }
    });
})



// .config(['$routeProvider', function($routeProvider) {
//  $routeProvider.when('/external/:param1', {
//      templateUrl: 'templates/external.html',
//      controller: 'ExternalCtrl'
//  })
// }])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    // $ionicConfigProvider
    // http://ionicframework.com/docs/api/provider/%24ionicConfigProvider/
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');

    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show');
                // console.log('loading:show');
                // console.log('config: ', config);
                return config;
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide');
                // console.log('loading:hide');
                // console.log('response: ', response);
                return response;
            }
        };
    });

    $stateProvider

    .state('intro', {
        url: '/',
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl'
    })

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.external', {
        url: '/external/:url',
        views: {
            'menuContent': {
                templateUrl: 'templates/external.html',
                controller: 'ExternalCtrl'
            }
        }
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                // templateUrl: 'templates/home-typeface.html',
                // templateUrl: 'templates/home-grid-2b.html',
                // templateUrl: 'templates/home-grid-2.html',
                // templateUrl: 'templates/home-grid-3.html',
                // templateUrl: 'templates/home-rows.html',
                // templateUrl: 'templates/home-stream-phone-portrait.html',
                templateUrl: 'templates/home-demo.html',
                // controller: 'HomeCtrl'
                controller: 'HomeStreamCtrl'
            }
        }
    })

    .state('app.podcasts', {
        url: '/podcasts',
        views: {
            'menuContent' : {
                templateUrl: 'templates/podcasts.html',
                controller: 'PodcastsCtrl'
            }
        }
    })

    .state('app.podcast', {
        url: '/podcast/:podcastId',
        views: {
            'menuContent' : {
                templateUrl: 'templates/podcast.html',
                controller: 'PodcastCtrl'
            }
        }
    })

    .state('app.dotw', {
        url: '/dotw',
        views: {
            'menuContent': {
                templateUrl: 'templates/dotw.html',
                controller: 'DotwCtrl'
            }
        }
    })

    .state('app.disease', {
        url: '/disease/:newId',
        views: {
            'menuContent': {
                templateUrl: 'templates/disease.html',
                controller: 'DiseaseCtrl'
            }
        }
    })


    .state('app.youtubevideos', {
        url: '/youtubevideos',
        views: {
            'menuContent': {
                templateUrl: 'templates/youtube-videos.html',
                controller: 'YouTubeVideosCtrl'
            }
        }
    })

    .state('app.youtubevideo', {
        url: '/youtubevideos/:videoId',
        views: {
            'menuContent': {
                templateUrl: 'templates/youtube-video.html',
                controller: 'YouTubeVideoCtrl'
            }
        }
    })

    .state('app.healtharticles', {
        url: '/healtharticles',
        views: {
            'menuContent': {
                templateUrl: 'templates/health-articles.html',
                controller: 'HealthArticlesCtrl'
            }
        }
    })

    .state('app.healtharticle', {
        url: '/healtharticle/:entryId',
        views: {
            'menuContent': {
                templateUrl: 'templates/health-article.html',
                controller: 'HealthArticleCtrl'
            }
        }
    })

    .state('app.vitalsigns', {
        url: '/vitalsigns',
        views: {
            'menuContent': {
                templateUrl: 'templates/vital-signs.html',
                controller: 'VitalSignsCtrl'
            }
        }
    })

    .state('app.vitalsign', {
        url: '/vitalsign/:entryId',
        views: {
            'menuContent': {
                templateUrl: 'templates/vital-sign.html',
                controller: 'VitalSignsCtrl'
            }
        }
    })

    // other states

    .state('app.source', {
        url: '/source/:entryId',
        views: {
            'menuContent' : {
                templateUrl: 'templates/source-stream.html',
                controller: 'StreamCtrl'
            }
        }
    })

    .state('app.typeface', {
        url: '/typeface',
        views: {
            'menuContent': {
                templateUrl: 'templates/home-typeface.html',
                controller: 'TypefaceCtrl'
            }
        }
    })

    .state('app.galleryfour', {
        url: '/galleryfour',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery4.html',
                controller: 'GalleryCtrl'
            }
        }
    })
    .state('app.gallerythree', {
        url: '/gallerythree',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery3.html',
                controller: 'GalleryCtrl'
            }
        }
    })
    .state('app.gallerytwo', {
        url: '/gallerytwo',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery2.html',
                controller: 'GalleryCtrl'
            }
        }
    })
    .state('app.cards', {
        url: '/cards',
        views: {
            'menuContent': {
                templateUrl: 'templates/cards.html',
                controller: 'CardsCtrl'
            }
        }
    })
    .state('app.thumbnails', {
        url: '/thumbnails',
        views: {
            'menuContent': {
                templateUrl: 'templates/thumbnails.html',
                controller: 'CardsCtrl'
            }
        }
    })



    .state('app.plugins', {
        url: '/plugins',
        views: {
            'menuContent': {
                templateUrl: 'templates/plugins.html',
                controller: 'PluginsCtrl'
            }
        }
    })

    .state('app.device', {
        url: '/plugins/device',
        views: {
            'menuContent': {
                templateUrl: 'templates/plugins/device.html',
                controller: 'DeviceCtrl'
            }
        }
    })

    .state('app.notifications', {
        url: '/plugins/notifications',
        views: {
            'menuContent': {
                templateUrl: 'templates/plugins/notifications.html',
                controller: 'NotificationsCtrl'
            }
        }
    })

    .state('app.settings', {
        url: '/settings',
        views: {
            'menuContent': {
                templateUrl: 'templates/settings.html',
                controller: 'SettingsCtrl'
            }
        }
    })

    .state('app.grid', {
        url: '/grid',
        views: {
            'menuContent': {
                templateUrl: 'templates/grid.html',
                controller: 'GenericCtrl'
            }
        }
    });

    // .state('app.guided-quiz', {
    //     url: '/guided-quiz',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/guided-quiz.html',
    //             controller: 'GuidedQuizCtrl'
    //         }
    //     }
    // })

    // .state('app.form-quiz', {
    //     url: '/form-quiz',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/form-quiz.html',
    //             controller: 'FormQuizCtrl'
    //         }
    //     }
    // });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');  // /app/home
});
