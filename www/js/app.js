eduApp.run(function($ionicPlatform, $http, AppService, CONFIG, $localstorage, $cordovaMedia) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        
        if(typeof window.screen.lockOrientation != 'undefined') {
        	window.screen.lockOrientation('portrait');	
        }
        
        if(typeof Media != 'undefined') {
            mediaObj = $cordovaMedia.newMedia(CONFIG.PATH + "icanwalk.mp3");
        } else {
        	mediaObj = new Audio(CONFIG.PATH + "icanwalk.mp3");
        }
    });
});
eduApp.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
    .state('tabs', {
    	url: "/tab",
    	abstract: true,
    	templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
    	url: "/home",
    	views: {
    		'home-tab': {
    			templateUrl: "templates/home.html",
    			controller: 'AppController'
    		}
    	}
    })
    .state('tabs.liveshow', {
    	url: "/liveshow/:categoryId",
    	views: {
    		'home-tab': {
    			templateUrl: "templates/liveshow.html",
    			controller: 'AnimalController'
    		}
    	}
    });
    
	$urlRouterProvider.otherwise("/tab/home");

});