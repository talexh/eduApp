eduApp.controller('AppController', function($scope, $state, $stateParams, $cordovaFileTransfer, AppService, $window, $ionicModal, CONFIG, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

//    document.addEventListener('deviceready', function () {
//    	var uri = "http://www.ekc.ch/ekcmobileweb/images/logo/2_shoppitivoli_logo_shopping_mall.png";
//        var targetPath = 'cdvfile://localhost/persistent/eduappdata/shoppyland.png';
//        AppService.download(uri, targetPath, function(entry){
//        	angular.element(document.getElementsByClassName('append-container')).append('<img src="'+entry.toURL()+'" width="150" height="auto"/>');
//        });
//    		
//    }, false);
	
    var w = angular.element($window);
    $scope.categories = AppService.getCategories();
    $scope.path = CONFIG.PATH;
    $scope.landingTo = function($url, categoryId) {
        $timeout(function() {
            //AppService.stop($scope.audio);
            //$scope.audio.stop();
            //$scope.audio.pause();
            //$scope.audio.currentTime = 0;
            $state.go($url,{'categoryId':categoryId});
            angular.element(document.getElementsByClassName('scale-animation')).removeClass("scale-animation");
        }, 700);
    	
    };

    //$scope.contents = jsonData.news;
    $scope.landingToHome = function($url) {
    	$state.go($url);
    };

//     AppService.play($scope.path + 'ai-kho-vi-ai.mp3', function(audio){
//         //$scope.audio = audio;
//         //audio.stop();
//     });

    
});
eduApp.controller('AnimalController', function($scope, $window, $state, $cordovaMedia, $ionicPlatform, AppService, $stateParams, CONFIG, $timeout) {
	
	angular.element(document.getElementsByClassName('scale-animation')).removeClass("scale-animation");
	
  // path to file downloaded
  $scope.path = CONFIG.PATH;
  $scope.categoryId = parseInt($stateParams.categoryId, 10);
  $scope.lineHeight = $window.innerHeight +'px';
  
  $scope.contents = AppService.getContentByCategory($scope.categoryId);
  $scope.defaultItem = AppService.getRandomContentInList($scope.contents);

//  var currentObj = angular.element(document.getElementsByClassName('current'));
//  currentObj.addClass('has-animation');
//  console.log(currentObj[0].className);
//  console.log($scope.path + $scope.defaultItem.sound);
  AppService.play($scope.path + $scope.defaultItem.sound, function(audio){
	  //currentObj.removeClass("scale-animation");
  	//o.addClass('clickable');
  });
//  
  //Play sound
  $scope.play = function($event) {
    
    var o = angular.element($event.target).parent(),
      cls = AppService.getAttribute(o,'class'),
      src = AppService.getAttribute(o, 'data-src');

    if(cls.indexOf('animal-item') == -1 || cls.indexOf('clickable') == -1) return false;  
    o.removeClass('clickable');
    var target = angular.element(document.getElementsByClassName('scale-animation'));
    
    AppService.play(src, function(audio){
    	target.removeClass("scale-animation");
    	o.addClass('clickable');
    });
  };
    
  $scope.onSwipeLeft = function(curIdx, total) {
    
    var prevIdx = 0;
    if(curIdx == 0) {
      prevIdx = total - 1;
    } else {
      prevIdx = curIdx - 1;
    }
    
    angular.element(document.querySelector('[data-index="'+curIdx+'"]')).removeClass('current');
    var currentObj = angular.element(document.querySelector('[data-index="'+prevIdx+'"]'));
    currentObj.addClass('current').addClass('has-animation');
    
    // Play sound
    AppService.play(currentObj[0].getAttribute('data-src'), function(audio){
      currentObj.removeClass("has-animation");
    });
  };
    
  $scope.onSwipeRight = function(curIdx, total) {
    
    var nextIdx = 0;
    if(curIdx == total - 1) {
      nextIdx = 0;
    } else {
      nextIdx = curIdx + 1;
    }
    angular.element(document.querySelector('[data-index="'+curIdx+'"]')).removeClass('current');
    var currentObj = angular.element(document.querySelector('[data-index="'+nextIdx+'"]'));
    currentObj.addClass('current').addClass('has-animation');
    
    // Play sound
    AppService.play(currentObj[0].getAttribute('data-src'), function(audio){
      currentObj.removeClass("has-animation");
    });
  };
});

eduApp.directive('scaleAnimation', function($window, CONFIG, $timeout){
    return {
        link : function(scope, element, attrs){
            element.bind('click', function() {
                element.addClass('scale-animation');
            });
        }
    };
});

eduApp.directive('position', function ($window, AppService, CONFIG) {

    return {
        restrict: "A",
        link: function (scope, elem, attr) {
            //$timeout(function(){
               
                var container = angular.element(document.getElementsByClassName('objects')),
                    pw = parseFloat(container[0].offsetWidth),
                    ph = parseFloat(container[0].offsetHeight),
                    containerHeight = parseFloat($window.innerHeight/2),
                    size = ($window.innerWidth+'x'+$window.innerHeight);

                if(attr['class'].indexOf('first-item') != -1) {
                    //var img = new Image();
                    //img.src = attr['src'];
                    //img.onload = function(){
                    elem.bind('load', function(e) {
                        var w = parseFloat(this.width),
                            h = parseFloat(this.height);
                        
                        var minus = AppService.calculatorPosition(size);
                        
                        scope.offsetBottom = (containerHeight/2 - h/2 - minus) + 'px';
                        scope.offsetLeft = '30px';
                        elem.css('bottom', scope.offsetBottom);
                        elem.css('left', scope.offsetLeft);
                        //console.log(elem.parent().offsetHeight);
                        //alert('bottom: '+scope.offsetBottom);
                        //alert('left: '+scope.offsetLeft);
                    });
                }
                
                if(attr['class'].indexOf('last-item') != -1) {
                    elem.bind('load', function(e) {
                        var w = parseFloat(this.width),
                            h = parseFloat(this.height);
                        var wSpace = (pw - w),
                             hSpace = ((ph - h) + (elem[0].offsetHeight - h) );
                        
                        scope.offsetTop = (hSpace/2) + 'px';
                        elem.css('top', scope.offsetTop);
                        //alert('top: '+scope.offsetTop);
                    });
                     
                 }
            //},1000);
        	
         }
    };
});

var FileModule = angular.module('fileModule', ['ionic','ngCordova'])
.controller('DownloadController', function($scope, $timeout, $cordovaFileTransfer) {

  
});

