


(function () {
    'use strict';

    angular
        .module('angularActionList')
        .directive('treeBranch', treeBranch);

    treeBranch.$inject = [];

    function treeBranch() {
        return {
            restrict: 'AE',
            templateUrl: '/angular-action-list/treeBranchDirective/treeBranch.html',
            scope: {
                branchDeep: '=',
                toggleValue: '=',
                typeToggleable: '<'
            },
            link: function (scope, elem, attr) {

                scope.getLeverArr = function(size) {
                    return new Array(+size);
                };

                scope.toggleChildLevel = function (status) {
                    if(status) {
                        scope.toggleValue.isOpened = !scope.toggleValue.isOpened;
                    }
                }

            }
        }
    }

})();