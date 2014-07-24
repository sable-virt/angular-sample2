/**
 * app.js
 */
(function (angular) {
    var MODULES = [
        'ngRoute'
    ];
    var MODULE_GROUP = [
        "controllers",
        "filters",
        "services",
        "directives",
        "templates"
    ];
    for (var i = 0, len = MODULE_GROUP.length; i < len; i++) {
        angular.module(MODULE_GROUP[i], []);
    }

    angular.module("app", MODULES.concat(MODULE_GROUP)).config(function ($httpProvider,$routeProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHTTPRequest";
        $routeProvider.
            when('/', {
                templateUrl: 'views/index.html'
            }).
            when('/restrict/:type', {
                templateUrl: function($param) {
                    return 'views/restrict/'+$param.type+'.html';
                }
            }).
            when('/scope/:id', {
                templateUrl: function($param) {
                    return 'views/scope/'+$param.id+'.html';
                },
                controller: 'PatternCtrl'
            }).
            when('/pattern/:id', {
                templateUrl: function($param) {
                    return 'views/pattern/'+$param.id+'.html';
                },
                controller: 'PatternCtrl'
            }).
            when('/logic/:id', {
                templateUrl: function($param) {
                    return 'views/logic/'+$param.id+'.html';
                },
                controller: 'PatternCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    });
})(angular);
