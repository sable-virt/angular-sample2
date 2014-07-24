/**
 * パターンコントローラー
 */
angular.module('controllers').controller('PatternCtrl', function ($scope) {
    $scope.name = 'PatternCtrl';
    $scope.messages = [];
    $scope.inputMessage = '';
    $scope.data = [
        {
            id: 0,
            name: 'Ichiro',
            age: 13
        },
        {
            id: 1,
            name: 'Jiro',
            age: 10
        },
        {
            id: 2,
            name: 'Hanako',
            age: 6
        }
    ];
    $scope.send = function() {
        var message = $scope.inputMessage;
        if (!message) return;
        $scope.messages.unshift({
            date: new Date(),
            message: message
        });
        $scope.inputMessage = '';
    };
});