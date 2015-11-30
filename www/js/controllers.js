eduApp.controller('AppController', function($scope, $state, $stateParams, AppService, $window, $ionicPlatform, $localstorage, $cordovaMedia, $ionicModal, CONFIG, $timeout) {

	if(typeof Media != 'undefined') {
        mediaObj = $cordovaMedia.newMedia(CONFIG.PATH + "icanwalk.mp3");
    } else {
    	mediaObj = new Audio(CONFIG.PATH + "icanwalk.mp3");
    }
	
    $scope.lineHeight = $window.innerHeight +'px';
    var $categories = AppService.getCategories();
    $scope.categories = AppService.correctImagePath($categories);
    $scope.path = CONFIG.PATH;

    $ionicPlatform.ready(function() {
    	var lastestUpdate = $localstorage.get('lastestUpdate','');

    	// Enable this when has real server
    	/*$http.get(CONFIG.SERVER_URL + "logging/app_"+APP_ID+"_logger4all.json")
    	.success(function(response) {
    		if(lastestUpdate != response.date) {
        		$localstorage.set('lastestUpdate',response.date);
        		var list = response.log4Data;
        		
        		if(typeof list[0] == 'object') {
        			var name = AppService.getFilename(list[0].filename);
        			
        			AppService.download(list, 0, function(entry){});
        		}
        	} else {
        		angular.element(document.getElementsByClassName('main-container')).addClass('hidden');
        		if(mediaObj != null) {
    	    		mediaObj.play();
    	    	}
        	}
    	});*/
    	
    	var response = {};
    	response.log4Data = [{"filename":'http://www.ekc.ch/logos-4live-app/bench.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/beldona.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/blackout_2.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/aaamigros.png'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/exlibris.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/bench.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/beldona.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/blackout_2.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/aaamigros.png'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/exlibris.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/bench.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/beldona.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/blackout_2.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/aaamigros.png'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/exlibris.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/bench.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/beldona.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/blackout_2.jpg'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/aaamigros.png'},
    	                     {"filename":'http://www.ekc.ch/logos-4live-app/exlibris.jpg'}];
    	
    	response.date = "2015-01-12";
    	
    	if(lastestUpdate != response.date) {
    		AppService.download(response, 0, function(entry){});
    	} else {
    		angular.element(document.getElementsByClassName('main-container')).addClass('hidden');
    		if(mediaObj != null) {
	    		mediaObj.play();
	    	}
    	}
    	
		if(mediaObj != null) {
//    		mediaObj.play();
    		$scope.stopMedia = function(){
    			mediaObj.pause();
    		};
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
	
	$scope.contents = AppService.correctImagePath(contents);
	$scope.defaultItem = AppService.getRandomContentInList($scope.contents);

	// Play sound when user click from home page
	if(!soundOff) {
		AppService.play($scope.defaultItem.sound, function(audio){});
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

