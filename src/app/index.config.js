function config($logProvider, toastrConfig, $mdThemingProvider) {
    $logProvider.debugEnabled(true);
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
    var defaultPalette = 'deep-orange';
    var greyBackgroundMap = $mdThemingProvider.extendPalette(defaultPalette, { 'A100': 'fafafa' });
    $mdThemingProvider.definePalette('grey-background', greyBackgroundMap);
    $mdThemingProvider.setDefaultTheme(defaultPalette);
    $mdThemingProvider
        .theme(defaultPalette)
        .primaryPalette(defaultPalette, {
        'default': 'A700',
        'hue-1': '400'
    })
        .accentPalette('blue')
        .backgroundPalette('grey-background');
}
exports.config = config;
