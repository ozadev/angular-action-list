

(function () {
    'use strict';

    angular.module('angularActionList').component('listTree', {
        templateUrl: './angular-action-list/listTreeComponent/listTree.html',
        bindings: {
            listData: '=',
            currentLevel: '<',
            menuExpanderConfig: '<'
        },
        controllerAs: 'vm',
        controller: listTreeController
    });

    listTreeController.$inject = ['$document', '$scope', '$rootScope'];

    function listTreeController($document, $scope, $rootScope) {
        var vm = this;

        vm.menuExpanderOpenIndex = null;

        vm.isNotEmptyArray = isNotEmptyArray;

        vm.calcListItemOffset = calcListItemOffset;
        vm.menuExpanderOpen = menuExpanderOpen;

        $document.ready(initListToggle);

        //
        //
        //

        function calcListItemOffset(deepLevel) {
            var baseWidthLaptop = 40;
            var levelWidthLaptop = 42;

            if ($rootScope.isScreenMobile()) {
                return 12 + 30 * deepLevel;
            }

            if ($rootScope.isScreenTablet()) {
                return baseWidthLaptop + deepLevel * levelWidthLaptop;
            }

            if ($rootScope.isScreenLaptop() || $rootScope.isScreenDesktop()) {
                return baseWidthLaptop + deepLevel * levelWidthLaptop;
            }

            return 700;
        }

        function menuExpanderOpen(index) {
            if(!$rootScope.isScreenTablet()) return;

            if (vm.menuExpanderOpenIndex === index) {
                vm.menuExpanderOpenIndex = null;
            }
            else {
                vm.menuExpanderOpenIndex = index;
            }
        }

        function callback(id) {
            console.log(this.title + ' - ' + id);
        }

        function initListToggle() {
            vm.controlToggle = vm.listData.map(function(item) {
                return {
                    isOpened: false
                };
            });

            $scope.$digest();
        }

        function isNotEmptyArray(item) {
            if (angular.isDefined(item) && angular.isArray(item) && item.length != 0) {
                return true;
            }
            return false;
        }

    }

})();



