/** @ngInject */
export function config($logProvider: ng.ILogProvider, $mdThemingProvider: angular.material.IThemingProvider) {
  // enable log
  $logProvider.debugEnabled(true);

  // set the default palette name
  var defaultPalette = 'red';
  // define a palette to darken the background of components
  var greyBackgroundMap = $mdThemingProvider.extendPalette(defaultPalette, {'A100': 'fafafa'});

  $mdThemingProvider.definePalette('grey-background', greyBackgroundMap);
  $mdThemingProvider.setDefaultTheme(defaultPalette);

  // customize the theme
  $mdThemingProvider
    .theme(defaultPalette)
    .primaryPalette(defaultPalette, {
    'default': '500', // by default use shade 400 from the pink palette for primary intentions
    'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
    'hue-2': '700', // use shade 600 for the <code>md-hue-2</code> class
    'hue-3': 'A100'
    })
    .accentPalette('teal', {
      'default': '500' // use shade 200 for default, and keep all other shades the same
    })
    .backgroundPalette('grey');
}
