

(function () {
    'use strict';

    angular.module('angularActionList', []);

})();






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






(function () {
    'use strict';

    angular.module('angularActionList').component('menuExpander', {
        templateUrl: './angular-action-list/menuExpanderComponent/menuExpander.html',
        bindings: {
            menuExpanderConfig: '=',
            rootItem: '<',
            menuTitle: '=',
            paramData: '=',
            opened: '<'
        },
        controllerAs: 'vm',
        controller: menuExpanderController
    });

    menuExpanderController.$inject = ['$sce'];

    function menuExpanderController($sce) {
        var vm = this;

        vm.sce = $sce;
    }

})();







(function () {
    'use strict';

    angular
        .module('angularActionList')
        .directive('treeBranch', treeBranch);

    treeBranch.$inject = [];

    function treeBranch() {
        return {
            restrict: 'AE',
            templateUrl: './angular-action-list/treeBranchDirective/treeBranch.html',
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

(function () {
    'use strict';

    angular
        .module('angularActionList')
        .component('angularActionList', {
            templateUrl: './angular-action-list/angularActionList.html',
            bindings: {
                listData: '<'
            },
            controllerAs: 'vm',
            controller: angularActionListController
        });

    angularActionListController.$inject = [];

    function angularActionListController() {
        var vm = this;

        vm.rootMenuExpanderConfig = [
            {
                title: 'Editor',
                icon: 'text-icon',
                type: 'text-btn',
                callback: callback
            },
            {
                title: 'Date',
                icon: 'icon-icon-31 fa fa-calendar',
                type: 'circle-btn',
                callback: callback
            },
            {
                title: 'Edit',
                icon: 'icon-icon-28 fa fa-pencil-square-o',
                type: 'circle-btn',
                callback: callback
            },
            {
                title: 'Share',
                icon: 'icon-icon-30 fa fa-share-alt',
                type: 'circle-btn',
                callback: callback
            }
        ];

        vm.itemMenuExpanderConfig = [
            {
                title: 'Select',
                icon: 'text-icon',
                type: 'text-btn',
                callback: callback
            },
            {
                title: 'Date',
                icon: 'icon-icon-31 fa fa-calendar',
                type: 'circle-btn',
                callback: callback
            },
            {
                title: 'Edit',
                icon: 'icon-icon-28 fa fa-pencil-square-o',
                type: 'circle-btn',
                callback: callback
            },
            {
                title: 'Share',
                icon: 'icon-icon-30 fa fa-share-alt',
                type: 'circle-btn',
                callback: callback
            },
            {
                title: 'Delete',
                icon: 'icon-icon-26 fa fa-times',
                type: 'circle-btn',
                callback: callback
            }
        ];

        //
        //
        //

        function callback(propObj) {
            console.log(this.title + ' - ' + propObj.id);
        }

    }

})();




/*
 Main app module run config
 created by Oza / 08-01-2017
 */

(function () {
    'use strict';

    angular.module('angularActionList').run(runInitialization);


    runInitialization.$inject = ['$rootScope', '$window', '$document'];

    function runInitialization($rootScope, $window, $document) {

        var screenType = detectScreenType();

        $rootScope.scrollFreeze = false;

        angular.element($window).bind('resize', resizeHandler);

        $rootScope.isScreenMobile = function () {
            return screenType === 'mobile';
        };

        $rootScope.isScreenTablet = function () {
            return screenType === 'tablet';
        };

        $rootScope.isScreenLaptop = function () {
            return screenType === 'laptop';
        };

        $rootScope.isScreenDesktop = function () {
            return screenType === 'desktop';
        };

        $rootScope.$on('$stateChangeSuccess', function () {
            $document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
        });

        $rootScope.$on('setScrollFreeze', function (event, data) {
            $rootScope.scrollFreeze = data;
        });


        //
        //
        //

        function detectScreenType() {
            if ($window.innerWidth < 768) return 'mobile';
            if ($window.innerWidth < 1024) return 'tablet';
            if ($window.innerWidth < 1200) return 'laptop';

            return 'desktop';

        }

        function resizeHandler() {
            var currScreenType = detectScreenType();

            if (currScreenType !== screenType) {
                screenType = currScreenType;
                $rootScope.$digest();
            }
        }

    }

})();