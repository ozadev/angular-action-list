
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



