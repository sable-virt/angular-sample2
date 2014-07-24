angular.module('directives').directive('sidebar',function($location) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/sidebar.html'
    };
});