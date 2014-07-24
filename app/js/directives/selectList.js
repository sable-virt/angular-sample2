angular.module('directives').directive('selectList',function() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            data: '=',
            ngModel: '='
        },
        templateUrl: 'templates/selectList.html',
        controller: function($scope) {
            $scope.select = function(val) {
                $scope.ngModel = val;
            }
        }
    };
});