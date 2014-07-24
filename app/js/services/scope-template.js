angular.module('services').factory('ScopeTemplate', function() {
    function ScopeTemplate(options) {
        this.restrict = 'E';
        this.template = '<pre>{{result | json}}</pre>';
        this.link = function($scope) {
            $scope.result = angular.extend({},$scope);
        };
        angular.extend(this,options);
    }
    return ScopeTemplate;
});