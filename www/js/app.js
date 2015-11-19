eduApp.run(function($ionicPlatform, AppService) {
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

        window.screen.lockOrientation('portrait');
        
        alert("device ready");
        var uri = "http://www.ekc.ch/ekcmobileweb/images/logo/2_shoppitivoli_logo_shopping_mall.png";
        var targetPath = 'cdvfile://localhost/persistent/eduappdata/shoppyland.png';
        AppService.download(uri, targetPath, function(entry){
        	angular.element(document.getElementsByClassName('append-container')).append('<img src="'+entry.toURL()+'" width="150" height="auto"/>');
        });
        
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