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


.factory('SettingsStorage', function() {
    return {
        all: function() {
            var settings = window.localStorage['settings'];
            if (settings) {
                return angular.fromJson(settings);
            }
            return {
                options: [
                {
                   name: 'Receive Notifications',
                   checked: true
                },
                {
                   name: 'Vibrate',
                   checked: false
                },
                {
                   name: 'Sound',
                   checked: false
                }],
                sorting: 'A'
            };
    },
    save: function(settings) {
        window.localStorage['settings'] = angular.toJson(settings);
    },
    clear: function() {
        window.localStorage.removeItem('settings');
    }
};
})

.factory('MenuStorage', function() {
    return {
        all: function() {
            var menu = window.localStorage['menu'];
            if (menu) {
                console.log("Menu Data Exists");
                return angular.fromJson(menu);
            }

            // default settings, which ideally would come from a JSON file stored locally... say, config.json?
            return {}

        },
        save: function(menu) {
            console.log("Saving Menu: ", menu);
            window.localStorage['menu'] = angular.toJson(menu);
        },
        clear: function() {
            window.localStorage.removeItem('menu');
        }
    };
});
