var index_config_1 = require('./index.config');
var index_route_1 = require('./index.route');
var index_run_1 = require('./index.run');
var main_controller_1 = require('./main/main.controller');
var login_controller_1 = require('../app/components/login/login.controller');
var webDevTec_service_1 = require('../app/components/webDevTec/webDevTec.service');
var navbar_directive_1 = require('../app/components/navbar/navbar.directive');
var sidebar_directive_1 = require('../app/components/sidebar/sidebar.directive');
var recordDialog_controller_1 = require('../app/components/moments/recordDialog.controller');
var emoment;
(function (emoment) {
    'use strict';
    angular.module('emoment', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'toastr', 'firebase'])
        .constant('moment', moment)
        .config(index_config_1.config)
        .config(index_route_1.routerConfig)
        .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('orange');
    })
        .run(index_run_1.runBlock)
        .service('webDevTec', webDevTec_service_1.WebDevTecService)
        .controller('RecordDialogController', recordDialog_controller_1.recordMomentDialog)
        .controller('MainController', main_controller_1.Moments.MainController)
        .controller('LoginController', login_controller_1.LoginController)
        .directive('acmeNavbar', navbar_directive_1.acmeNavbar)
        .directive('emSidebar', sidebar_directive_1.emSidebar);
})(emoment || (emoment = {}));
