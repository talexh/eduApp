/**
 * 
 */
/** *Load an externl JS file and append it to the head */ 
function require(file,callback){ 
	var head=document.getElementsByTagName("head")[0];
	var script=document.createElement('script');
	script.src=file; script.type='text/javascript'; 
	//real browsers 
	script.onload=callback; //Internet explorer 
	script.onreadystatechange = function() { 
		if (_this.readyState == 'complete') {
			callback(); 
		}
	}
	head.appendChild(script); 
}
var isAppForeground = true;

var mediaObj = null,audioObj = null,soundOff = false,filename = '', $categories = [], $contents = [];

angular.module('eduApp.utils', [])

.factory('$Utility', ['$window', function($window) {
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
	    },
	    appendFile : function($downloadFilename, callback){
			if($downloadFilename.indexOf('.js') != -1) {
				//var scriptObject = document.createElement('script');
				//scriptObject.src = $downloadFilename;
				//scriptObject.type = "text/javascript";
				angular.element(document.getElementsByTagName('head')).append('<script src="'+$downloadFilename+'"></script>');
				callback ? callback(): null;
			}
		},
	 }
}]);

/*
 * *****************************************
 * 
 * *****************************************
 * */

var eduApp = angular.module('eduApp', ['ionic','ngCordova', 'eduApp.utils'])
eduApp.constant('CONFIG', {
    APP_NAME: 'Zkids App',
    APP_VERSION: '1.0',
    PATH : 'ZkidsAppData/',
    SERVER_URL: 'http://zkidsapp.com/public/communicate/',
    SYSTEM_LANGUAGE: 'vi',
    iPhone4: '320x480',
    iPhone5: '320x568',
    iPhone6: '375x627',
    iPhone6p: '414x736',
    iPad: '768x1024',
    DYLAMIC_PATH : '',
    DOWNLOAD_PATH: 'cdvfile://localhost/persistent/ZkidsAppData/',
});

