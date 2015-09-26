/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { Moments} from './main/main.controller';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { acmeNavbar } from '../app/components/navbar/navbar.directive';
import { emSidebar } from '../app/components/sidebar/sidebar.directive'
import { AudioContextService, UserMediaProvider, convertFloat32ToInt16 } from './main/util.services';

import { recordMomentDialogController } from '../app/components/moments/recordDialog.controller'
declare var moment: moment.MomentStatic;

module emoment {
  'use strict';

  angular.module('emoment', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'toastr'])
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('orange');
    })
    .run(runBlock)
    .factory('audioContext', AudioContextService)
    .factory('userMediaProvider', ['$window',UserMediaProvider])
    .service('webDevTec', WebDevTecService)
    .controller('RecordDialogController', recordMomentDialogController)
    .controller('MainController', Moments.MainController)
    .directive('acmeNavbar', acmeNavbar)
    .directive('emSidebar', emSidebar)
}
