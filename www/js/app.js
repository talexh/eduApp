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
        
//        var lastUpdated = $localstorage.get('lastupdated','');
//        $http.get("http://demo.ekc.ch/logger.json")
//        .success(function(response) {
//        	if(lastUpdated != response.date) {
//        		AppService.checkRequestDownload(response,function(){});	
//        	}
//        });
//        var uri = "http://www.ekc.ch/ekcmobileweb/images/logo/2_shoppitivoli_logo_shopping_mall.png";
//        var targetPath = 'cdvfile://localhost/persistent/eduappdata/shoppyland.png';
//        AppService.download(uri, targetPath, function(entry){
//        	angular.element(document.getElementsByClassName('append-container')).append('<img src="'+entry.toURL()+'" width="150" height="auto"/>');
//        });
        
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