/**
 * 
 */
var isAppForeground = true;

var mediaObj = null,soundOff = false,filename = '';
angular.module('eduApp.utils', [])

.factory('$localstorage', ['$window', function($window) {
	 return {
	    set: function(key, value) {
	      $window.localStorage[key] = value;
	    },
	    get: function(key, defaultValue) {
	      return $window.localStorage[key] || defaultValue;
	    },
	    setObject: function(key, value) {
	      $window.localStorage[key] = JSON.stringify(value);
	    },
	    getObject: function(key) {
	      return JSON.parse($window.localStorage[key] || '{}');
	    }
	 }
}]);
var eduApp = angular.module('eduApp', ['ionic','ngCordova', 'eduApp.utils'])
eduApp.constant('CONFIG', {
    APP_NAME: 'edu App',
    APP_VERSION: '1.0',
    PATH : 'AnimalsData/',
    SERVER_URL: 'http://apps.zkids.com/',
    SYSTEM_LANGUAGE: 'vi',
    iPhone4: '320x480',
    iPhone5: '320x568',
    iPhone6: '375x627',
    iPhone6p: '414x736',
    iPad: '768x1024',
    DYLAMIC_PATH : '',
    DOWNLOAD_PATH: 'cdvfile://localhost/persistent/eduappdata/',
});

