/**
 * ルートコントローラー
 */
angular.module('controllers').controller('RootCtrl', function ($scope,$location,$rootScope) {
    $scope.name = 'RootCtrl';
    $rootScope.$on('$locationChangeSuccess', function() {
        $scope.current = $location.path();
    });
});