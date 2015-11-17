IoApp.run(function($ionicPlatform, $cordovaFileTransfer) {
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
       
//        var url = "http://www.ekc.ch/ekcmobileweb/images/logo/2_shoppitivoli_logo_shopping_mall.png";
//        var targetPath = cordova.file.documentsDirectory + "testImage.png";
//        $cordovaFileTransfer.download(url, targetPath, {}, true)
//          .then(function(result) {
//            // Success!
//        	  alert(targetPath);
//        	  $scope.imgdownloaded = targetPath;
//          }, function(err) {
//        	  alert('error');
//            // Error
//          }, function (progress) {
//            $timeout(function () {
//            	$scope.downloadProgress = (progress.loaded / progress.total) * 100;
//            })
//          });
        
    });
});
IoApp.config(function($stateProvider, $urlRouterProvider) {

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