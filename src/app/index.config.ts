/** @ngInject */
export function config($logProvider: ng.ILogProvider, $mdThemingProvider: angular.material.IThemingProvider) {
  // enable log
  $logProvider.debugEnabled(true);

  // set the default palette name
  var defaultPalette = 'deep-orange';
  // define a palette to darken the background of components
  var greyBackgroundMap = $mdThemingProvider.extendPalette(defaultPalette, {'A100': 'fafafa'});

  $mdThemingProvider.definePalette('grey-background', greyBackgroundMap);
  $mdThemingProvider.setDefaultTheme(defaultPalette);

  // customize the theme
  $mdThemingProvider
    .theme(defaultPalette)
    .primaryPalette(defaultPalette, {
      'default' : 'A700',
      'hue-1' : '400'
    })
    .accentPalette('blue')
    .backgroundPalette('grey-background');

}
