angular.module('directives').directive('dummyText',function() {
    return {
        restrict: 'ACEM',
        replace: true,
        template: '<p class="bg-success">OK</p>'
    };
});