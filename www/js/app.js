
eduApp.run(function($ionicPlatform, $state, $http, AppService, $ionicPopup, $rootScope, $window, CONFIG, $Utility, $cordovaMedia, $timeout) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
    	// clear cache
        if(typeof window.cache != 'undefined') {
        	AppService.clearCache();
        }
        
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
        downloadPath = cordova.file.documentsDirectory + 'ZkidsAppData/';
        
    	var lastestUpdate = $Utility.get('lastestUpdate');
    	
    	// If 15 seconds the app still not connected to internet then redirect to home page
    	var promise = $timeout(function(){
    		AppService.appendDownloadData(function(){
    			$categories = AppService.getCategories();
      			$state.go("tabs.home", {}, {reload: false});
      		});
    		$timeout.cancel(promise);
    	}, 15000);
    	
    	// Enable this when has real server
    	// Check if has internet then request on server to check any new updated the data
      	$http.get(CONFIG.SERVER_URL + "app_"+APP_ID+"_logger4all")
      	.success(function(response) {
      		
      		if(lastestUpdate != response.date) {
      			angular.element(document.querySelector('.checking')).addClass('hidden').removeClass('show');
          		angular.element(document.querySelector('.downloading')).removeClass('hidden').addClass('show');
          		AppService.download(response, 0, function(entry){
          		});
          	} else {
          		AppService.appendDownloadData(function(){
          			$categories = AppService.getCategories();
          			$state.go("tabs.home", {}, {reload: false});
          		});
          	}
      		$timeout.cancel(promise);
      	}, function(err) {
      		AppService.appendDownloadData(function(){
      			$categories = AppService.getCategories();
      			$state.go("tabs.home", {}, {reload: false});
      		});
      		$timeout.cancel(promise);
  	    });
      	
      	// Show ad banner
      	//onDeviceReady();
      	
      //======admob code start=============
      	 
        var admobid = {};
          // select the right Ad Id according to platform
          if( /(android)/i.test(navigator.userAgent) ) { 
              admobid = { // for Android
                  banner: 'ca-app-pub-3667370934581818/1249913482',
                  interstitial: ''
              };
          } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
              admobid = { // for iOS
                  banner: 'ca-app-pub-3667370934581818/1249913482',
                  interstitial: ''
              };
          } else {
              admobid = { // for Windows Phone
                  banner: 'ca-app-pub-6869992474017983/8878394753',
                  interstitial: 'ca-app-pub-6869992474017983/1355127956'
              };
          }
   
    if(window.AdMob) {
    	AdMob.createBanner( {
        adId:admobid.banner, 
        position:AdMob.AD_POSITION.BOTTOM_CENTER, 
        autoShow:true} );
    }
   
  //=======AdMob Code End=======
      	
        // play background music
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
    .state('tabs.checking', {
    	url: "/checking",
    	cache: false,
    	views: {
    		'checking-tab': {
    			templateUrl: "templates/checking.html",
    			controller: 'CheckingController'
    		}
    	}
    })
    .state('tabs.home', {
    	url: "/home",
    	cache: false,
    	views: {
    		'home-tab': {
    			templateUrl: "templates/home.html",
    			controller: 'AppController'
    		}
    	}
    })
    .state('tabs.liveshow', {
    	url: "/liveshow/:categoryId",
    	cache: false,
    	views: {
    		'list-tab': {
    			templateUrl: "templates/liveshow.html",
    			controller: 'AnimalController'
    		}
    	}
    });
    
	$urlRouterProvider.otherwise("/tab/checking");

});