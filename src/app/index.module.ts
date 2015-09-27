/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { Moments} from './main/main.controller';
import { LoginController } from '../app/components/login/login.controller';
import { ListsController } from '../app/components/moments/lists.controller';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { acmeNavbar } from '../app/components/navbar/navbar.directive';
import { emSidebar } from '../app/components/sidebar/sidebar.directive';
import { SettingsController } from '../app/components/settings/settings.controller';
import { AudioContextService, UserMediaProvider, convertFloat32ToInt16 } from './main/util.services';
import { UserServices } from './main/user.services';
import { MomentsFactory } from './main/moments.factory.ts';
import { recordMomentDialogController } from '../app/components/moments/recordDialog.controller'
declare var moment: moment.MomentStatic;

module emoment {
  'use strict';

  angular.module('emoment', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'firebase','yaru22.angular-timeago','spotify'])
    .constant('moment', moment)
    .constant('FIREBASE_URL', 'https://emoment.firebaseio.com/')
    .config(config)
    .config(routerConfig)
    .service('userServices', ['$firebaseObject', '$firebaseAuth', UserServices])
    .run(runBlock)
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('red')
        .accentPalette('teal');
    })
    .factory('momentsFactory', MomentsFactory)
    .factory('audioContext', AudioContextService)
    .factory('userMediaProvider', ['$window',UserMediaProvider])
    .service('webDevTec', WebDevTecService)
    .controller('RecordDialogController', recordMomentDialogController)
    .controller('MainController', Moments.MainController)
    .controller('SettingsController', SettingsController)
    .controller('LoginController', LoginController)
    .controller('ListsController', ListsController)
    .directive('acmeNavbar', acmeNavbar)
    .directive('emSidebar', emSidebar)
}
