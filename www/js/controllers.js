eduApp.controller('AppController', function($scope, $state, $stateParams, AppService, $window, $ionicPlatform,$cordovaMedia, $ionicModal, CONFIG, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
//    $scope.$on('$ionicView.enter', function(e) {
//    	console.log('view enter');
//    });

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

    //$scope.contents = jsonData.news;
    $scope.landingToHome = function($url) {
    	$state.go($url);
    };
    
    $ionicPlatform.ready(function() {
    	if(mediaObj != null) {
    		mediaObj.play();
    	}
     });
    
});
eduApp.controller('AnimalController', function($scope, $window, $state, $cordovaMedia, $ionicPlatform, AppService, $stateParams, CONFIG, $timeout) {
	
	//angular.element(document.getElementsByClassName('scale-animation')).removeClass("scale-animation");
	$scope.filename = filename;
	
	// path to file downloaded
	$scope.path = CONFIG.PATH;
	$scope.categoryId = parseInt($stateParams.categoryId, 10);
	$scope.lineHeight = $window.innerHeight +'px';
	
	var contents = AppService.getContentByCategory($scope.categoryId);
//	for(var k in contents) {
//		if(typeof contents[k] == 'object') {
//			if(contents[k].image_name == 'conhuoucaoco.jpg' && filename != ''){
//				contents[k].image_name = filename;
//			} else {
//				if(contents[k].image_name.indexOf(CONFIG.PATH) == -1) {
//					contents[k].image_name = CONFIG.PATH + contents[k].image_name;					
//				}
//			}
//		}
//	}
	
	$scope.contents = contents;
	$scope.defaultItem = AppService.getRandomContentInList(contents);

	// Play sound when user click from home page
	if(!soundOff) {
		AppService.play($scope.path + $scope.defaultItem.sound, function(audio){});
	}
	
	if(!soundOff) {
		angular.element(document.querySelector('.sound-off')).removeClass('hidden').addClass('show');
		angular.element(document.querySelector('.sound-on')).removeClass('show').addClass('hidden');
	} else {
		angular.element(document.querySelector('.sound-on')).removeClass('hidden').addClass('show');
		angular.element(document.querySelector('.sound-off')).removeClass('show').addClass('hidden');
	}
	$ionicPlatform.ready(function() {
		
		if(typeof Media != 'undefined') {
			mediaObj.stop();
	        $scope.playMedia = function() {
	        	mediaObj.play();
	        };	
		} else {
			mediaObj.pause();
	        $scope.playMedia = function() {
	        	mediaObj.play();
	        };
		}
		
     });
	
	$scope.onoffSound = function(current, other, isOff){
		angular.element(document.querySelector(current)).removeClass('hidden').addClass('show');
		angular.element(document.querySelector(other)).removeClass('show').addClass('hidden');
		
		soundOff = isOff;
	};
  
  //Play sound
	$scope.play = function($event) {
		
	    var o = angular.element($event.target).parent(),
	      cls = AppService.getAttribute(o,'class'),
	      src = AppService.getAttribute(o, 'data-src');
	
	    if(o.hasClass('animal-item') && o.hasClass('clickable')) {
	    	o.removeClass('clickable');
		    var target = angular.element(document.getElementsByClassName('scale-animation'));
		    if(soundOff) {
		    	$timeout(function(){
		    		target.removeClass("scale-animation");
			    	o.addClass('clickable');
		    	}, 600);
	    	} else {
	    	    AppService.play(src, function(audio){
	    	    	target.removeClass("scale-animation");
	    	    	o.addClass('clickable');
	    	    });
		
	    	}	    	
	    }  
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
	    if(currentObj.hasClass('slide-able')) {
	    	// TODO
	    	currentObj.removeClass('slide-able').addClass('current').addClass('slide-left');//.addClass('has-animation');
	    	if(soundOff) {
	    		$timeout(function(){
	    			currentObj.removeClass('slide-left').addClass('slide-able');
		    	}, 600);
	    		
	    	} else {
	    		// Play sound
			    AppService.play(currentObj[0].getAttribute('data-src'), function(audio){
			    	currentObj.removeClass('slide-left').addClass('slide-able');
			    });	    		
	    	}
	    }
	};
    
	$scope.onSwipeRight = function(curIdx, total) {
	    var nextIdx = 0;
	    if(curIdx == total - 1) {
	      nextIdx = 0;
	    } else {
	      nextIdx = curIdx + 1;
	    }
	    
	    var prev = angular.element(document.querySelector('[data-index="'+curIdx+'"]')).removeClass('current');
	    var currentObj = angular.element(document.querySelector('[data-index="'+nextIdx+'"]'));
	    
	    if(currentObj.hasClass('slide-able')) {
	    	// TODO
	    	currentObj.removeClass('slide-able').addClass('current').addClass('slide-right');
	    	if(soundOff) {
	    		$timeout(function(){
	    			currentObj.removeClass('slide-right').addClass('slide-able');
		    	}, 600);
	    	} else {
	    		// Play sound
			    AppService.play(currentObj[0].getAttribute('data-src'), function(audio){
			    	currentObj.removeClass('slide-right').addClass('slide-able');
			    });	    		
	    	}
	    }
	    
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

var FileModule = angular.module('fileModule', ['ionic','ngCordova'])
.controller('DownloadController', function($scope, $timeout, $cordovaFileTransfer) {

  
});

