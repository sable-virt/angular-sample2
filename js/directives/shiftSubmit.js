/**
 * Shift+Enterでsubmitするディレクティブ
 */
angular.module("directives").directive("shiftSubmit",
    function() {
        return {
            restrict: 'AC',
            link : function($scope, $element, $attr){
                function keydownHandler(e) {
                    var $form = angular.element('#' + $attr.shiftSubmit);
                    if (e.shiftKey && e.keyCode === 13) {
                        e.preventDefault();
                        $form.triggerHandler('submit');
                    }
                }
                $element.on("keydown", keydownHandler);
                $scope.$on('$destroy', function() {
                    $element.off("keydown", keydownHandler);
                });
            }
        };
    }
);