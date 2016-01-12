eduApp.controller('CheckingController', function($scope, $state, $stateParams, AppService, $window, $http,  $ionicPlatform, $Utility,$cordovaFile, $cordovaMedia, $ionicModal, CONFIG, $timeout) {
	$scope.path = CONFIG.PATH;
	$scope.downloadPath = downloadPath;
});

eduApp.controller('AppController', function($scope, $state, $stateParams, AppService, $window, $http, $ionicPlatform, $Utility,$cordovaFile, $cordovaMedia, $ionicModal, CONFIG, $timeout) {
    $scope.lineHeight = $window.innerHeight +'px';
    $scope.path = CONFIG.PATH;
    $scope.downloadPath = downloadPath;
    
    //$ionicPlatform.ready(function() {
//    	if($categories.length == 0) {
//        	$categories = AppService.getCategories();
//        }
        $scope.categories = $categories;//AppService.correctImagePath($categories);
        
	    if(mediaObj != null) {
	    	mediaObj.play();
			$scope.stopMedia = function(){
				mediaObj.pause();
			};
		}
    //});
    
});

eduApp.controller('AnimalController', function($scope, $window, $state, $cordovaMedia, $ionicPlatform, AppService, $stateParams, CONFIG, $timeout) {
	// path to file downloaded
	$scope.path = CONFIG.PATH;
    $scope.downloadPath = downloadPath;
    
	$scope.categoryId = parseInt($stateParams.categoryId, 10);
	$scope.lineHeight = $window.innerHeight +'px';
	
	//$ionicPlatform.ready(function() {
		$contents = AppService.getContentByCategory($scope.categoryId);
		$scope.contents = $contents;//AppService.correctImagePath($contents);
		$scope.defaultItem = AppService.getRandomContentInList($scope.contents);
		
		
		// Play sound when user click from home page
		if(!soundOff) {
			var soundDefault = $scope.defaultItem.sound_updated ? $scope.downloadPath + $scope.defaultItem.sound_updated : $scope.path + $scope.defaultItem.sound;
			AppService.play(soundDefault, function(audio){});
		}
		
		if(!soundOff) {
			angular.element(document.querySelector('.sound-off')).removeClass('hidden').addClass('show');
			angular.element(document.querySelector('.sound-on')).removeClass('show').addClass('hidden');
		} else {
			angular.element(document.querySelector('.sound-on')).removeClass('hidden').addClass('show');
			angular.element(document.querySelector('.sound-off')).removeClass('show').addClass('hidden');
		}
		
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
		    
		    
		    angular.element(document.querySelector('[data-index="'+curIdx+'"]')).removeClass('current').removeClass('slide-left');
		    var currentObj = angular.element(document.querySelector('[data-index="'+prevIdx+'"]'));
		    //if(currentObj.hasClass('slide-able')) {
		    	// TODO
		    	currentObj.addClass('current').addClass('slide-left');//.addClass('has-animation');
		    	if(soundOff) {
		    		$timeout(function(){
		    			//currentObj.removeClass('slide-left');
			    	}, 600);
		    		
		    	} else {
		    		// Play sound
				    AppService.play(currentObj[0].getAttribute('data-src'), function(audio){
				    	//currentObj.removeClass('slide-left');
				    });	    		
		    	}
		    //}
		};
	    
		$scope.onSwipeRight = function(curIdx, total) {
		    var nextIdx = 0;
		    if(curIdx == total - 1) {
		      nextIdx = 0;
		    } else {
		      nextIdx = curIdx + 1;
		    }
		    var prev = angular.element(document.querySelector('[data-index="'+curIdx+'"]')).removeClass('current').removeClass('slide-right');
		    var currentObj = angular.element(document.querySelector('[data-index="'+nextIdx+'"]'));
		    //if(currentObj.hasClass('slide-able')) {
		    	// TODO
		    	currentObj.addClass('current').addClass('slide-right');
		    	if(soundOff) {
		    		$timeout(function(){
		    			//currentObj.removeClass('slide-right');
			    	}, 600);
		    	} else {
		    		// Play sound
				    AppService.play(currentObj[0].getAttribute('data-src'), function(audio){
				    	//currentObj.removeClass('slide-right');
				    });	    		
		    	}
		    //}
		    
		};
		
     //});
	
	
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

eduApp.directive('getDownloadPath', function($window, CONFIG, $timeout){
    return {
        link : function(scope, element, attrs){
           scope.$downloadPath = cordova.file.documentsDirectory + 'ZkidsAppData/';
        }
    };
});

