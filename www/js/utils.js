/**
 * 
 */
var filename = '';
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
}])
.factory('Utility',['$window','CONFIG','$timeout', function($window, CONFIG, $timeout){
	return {
		appendFile : function($filename, callback){
			if($filename.indexOf('.js') != -1) {
				var scriptObject = document.createElement('script');
				scriptObject.src = CONFIG.DOWNLOAD_PATH + $filename;
				
				angular.element(document.querySelector('head')).append(scriptObject);
				
				$timeout(function(){
					callback ? callback(): null;
				}, 500));
			}
		},
	};
}]);
