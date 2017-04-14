

(function () {
    'use strict';

    angular.module('angularActionList').component('menuExpander', {
        templateUrl: '/angular-action-list/menuExpanderComponent/menuExpander.html',
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



