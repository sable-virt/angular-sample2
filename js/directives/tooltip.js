angular.module('directives').directive('tooltip',function() {
    return {
        restrict: 'AC',
        replace: true,
        scope: {},
        link: function($scope,$element,$attr) {
            $element.data('powertip',$attr.tooltip).powerTip();

            $scope.$on('$destroy', function() {
                $element.powerTip('destroy');
                console.log('$destroy');
            });
        }
    };
});
