angular.module('directives').directive('copyright',function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            name: '@'
        },
        template: '<footer>Copyright &copy; {{year}} {{name}} All Rights Reserved.</footer>',
        link: function($scope) {
            $scope.year = new Date().getFullYear();
        }
    };
});