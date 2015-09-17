angular.module('cdcgeneralapp.storage', [])

.factory('AppDataStorage', function() {
    return {
        all: function() {
            var appdatastorage = window.localStorage['appdatastorage'];
            if (appdatastorage) {
                return angular.fromJson(appdatastorage);
            }
            return {};
        },
        save: function(appdatastorage) {
            window.localStorage['appdatastorage'] = angular.toJson(appdatastorage);
        },
        clear: function() {
            window.localStorage.removeItem('appdatastorage');
        }
    };
})

.factory('NewsStorage', function() {
    return {
        all: function() {
            var news = window.localStorage['news'];
            if (news) {
                return angular.fromJson(news);
            }
            return {};
        },
        save: function(news) {
            window.localStorage['news'] = angular.toJson(news);
        },
        clear: function() {
            window.localStorage.removeItem('news');
        }
    };
})

.factory('DotwStorage', function() {
    return {
        all: function() {
            var dotw = window.localStorage['dotw'];
            if (dotw) {
                return angular.fromJson(dotw);
            }
            return {};
        },
        save: function(dotw) {
            window.localStorage['dotw'] = angular.toJson(dotw);
        },
        clear: function() {
            window.localStorage.removeItem('dotw');
        }
    };
})

.factory('HomeStreamStorage', function() {
    return {
        all: function() {
            var homestream = window.localStorage['homestream'];
            if (homestream) {
                return angular.fromJson(homestream);
            }
            return {};
        },
        save: function(homestream) {
            window.localStorage['homestream'] = angular.toJson(homestream);
        },
        clear: function() {
            window.localStorage.removeItem('homestream');
        }
    };
})

.factory('StreamStorage', function() {
    return {
        all: function() {
            var stream = window.localStorage['stream'];
            if (stream) {
                return angular.fromJson(stream);
            }
            return {};
        },
        save: function(stream) {
            window.localStorage['stream'] = angular.toJson(stream);
        },
        clear: function() {
            window.localStorage.removeItem('stream');
        }
    };
})

.factory('ProductsStorage', function() {
    return {
        all: function() {
            var products = window.localStorage['products'];
            if (products) {
                return angular.fromJson(products);
            }
            return {};
        },
        save: function(products) {
            window.localStorage['products'] = angular.toJson(products);
        },
        clear: function() {
            window.localStorage.removeItem('products');
        }
    };
})

.factory('HealthArticlesStorage', function() {
    return {
        all: function() {
            var healtharticles = window.localStorage['healtharticles'];
            if (healtharticles) {
                return angular.fromJson(healtharticles);
            }
            return {};
        },
        save: function(healtharticles) {
            window.localStorage['healtharticles'] = angular.toJson(healtharticles);
        },
        clear: function() {
            window.localStorage.removeItem('healtharticles');
        }
    };
})

.factory('VitalSignsStorage', function() {
    return {
        all: function() {
            var vitalsigns = window.localStorage['vitalsigns'];
            if (vitalsigns) {
                return angular.fromJson(vitalsigns);
            }
            return {};
        },
        save: function(vitalsigns) {
            window.localStorage['vitalsigns'] = angular.toJson(vitalsigns);
        },
        clear: function() {
            window.localStorage.removeItem('vitalsigns');
        }
    };
})
.factory('AboutStorage', function() {
    return {
        all: function() {
            var about = window.localStorage['about'];
            if (about) {
                return angular.fromJson(about);
            }
            return {};
        },
        save: function(about) {
            window.localStorage['about'] = angular.toJson(about);
        },
        clear: function() {
            window.localStorage.removeItem('about');
        }
    };
})

.factory('PostsStorage', function() {
    return {
        all: function() {
            var posts = window.localStorage['posts'];
            if (posts) {
                return angular.fromJson(posts);
            }
            return {};
        },
        save: function(posts) {
            window.localStorage['posts'] = angular.toJson(posts);
        },
        clear: function() {
            window.localStorage.removeItem('posts');
        }
    };
})

.factory('ServerPostsStorage', function() {
    return {
        all: function() {
            var serverposts = window.localStorage['serverposts'];
            if (serverposts) {
                return angular.fromJson(serverposts);
            }
            return {};
        },
        save: function(serverposts) {
            window.localStorage['serverposts'] = angular.toJson(serverposts);
        },
        clear: function() {
            window.localStorage.removeItem('serverposts');
        }
    };
})

.factory('FeedsStorage', function() {
    return {
        all: function() {
            var feeds = window.localStorage['feeds'];
            if (feeds) {
                return angular.fromJson(feeds);
            }
            return {};
        },
        save: function(feeds) {
            window.localStorage['feeds'] = angular.toJson(feeds);
        },
        clear: function() {
            window.localStorage.removeItem('feeds');
        }
    };
})

.factory('SettingsStorage', function() {
    return {
        all: function() {
            var settings = window.localStorage['settings'];
            if (settings) {
                return angular.fromJson(settings);
            }
            return {
            // Initial App Setting Values
            options: [
            {
                name: 'First Option',
                checked: true
            },
            {
                name: 'Second Option',
                checked: false
            },
            {
                name: 'Third Option',
                checked: false
            }],
            sorting: 'A',
            range: 30
        };
    },
    save: function(settings) {
        window.localStorage['settings'] = angular.toJson(settings);
    },
    clear: function() {
        window.localStorage.removeItem('settings');
    }
};
});
