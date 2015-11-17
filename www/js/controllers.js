IoApp.controller('AppController', function($scope, $state, $stateParams, $cordovaFileTransfer, AppService, $window, $ionicModal, CONFIG, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    //$scope.loginData = {};

    // Create the login modal that we will use later
    /*
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
    */
	
	

    document.addEventListener('deviceready', function () {
    	function fail () {
    		alert('created folder feail');
    	}

    	function gotFS(fileSystem) {
    		//console.log("filesystem got");
    		fileSystem.root.getDirectory('edudata', {
    			create : true,
    			exclusive : false
    		}, dirReady, fail);
    	}

    	function dirReady (entry) {
    		$scope.downloadPath = entry.fullPath + '/';
    		var targetPath = $scope.downloadPath + "testImage.png",
	        	trustHosts = true,
	        	options = {};
	        
	        //var fileTransfer = new FileTransfer();
	        //var uri = "http://www.ekc.ch/ekcmobileweb/images/logo/2_shoppitivoli_logo_shopping_mall.png";
	        //targetPath = targetPath.replace('file://','');
	        $scope.imgdownloaded = 'http://www.ekc.ch/ekcmobileweb/images/logo/2_shoppitivoli_logo_shopping_mall.png';
	        var url = "http://ekc.ch/ekcmobileweb/images/logo/2_shoppitivoli_logo_shopping_mall.png";
	        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
	          .then(function(result) {
	            // Success!
	        	  alert('Success: ' + targetPath);
	        	  $scope.imgdownloaded = targetPath;
	          }, function(err) {
	        	  alert('error code:' + err.code);
	            // Error
	          }, function (progress) {
	            $timeout(function () {
	            	$scope.downloadProgress = (progress.loaded / progress.total) * 100;
	            })
	          });
//	        fileTransfer.download(
//	        	uri,
//	            targetPath,
//	            function(entry) {
//	                alert("download complete: " + entry.toURL());
//	                $scope.imgdownloaded = 'http://www.ekc.ch/ekcmobileweb/images/logo/2_shoppitivoli_logo_shopping_mall.png';
//	            },
//	            function(error) {
//	                alert("download error source " + error.source);
//	                alert("download error target " + error.target);
//	                alert("upload error code" + error.code);
//	                
//	            },
//	            false,
//	            {
//	                headers: {
//	                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
//	                }
//	            }
//	        );
    		
    	}
    	
    	if(typeof LocalFileSystem != 'undefined') {
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		}
    	
        
        
       

    }, false);
	
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
IoApp.controller('AnimalController', function($scope, $window, $state, $cordovaMedia, $ionicPlatform, AppService, $stateParams, CONFIG, $timeout) {
	
	angular.element(document.getElementsByClassName('scale-animation')).removeClass("scale-animation");
	
  // path to file downloaded
  $scope.path = CONFIG.PATH;
  $scope.categoryId = parseInt($stateParams.categoryId, 10);
  $scope.lineHeight = $window.innerHeight +'px';
  
  $scope.contents = AppService.getContentByCategory($scope.categoryId);
  $scope.defaultItem = AppService.getRandomContentInList($scope.contents);
  
  AppService.play($scope.path + $scope.defaultItem.sound, function(audio){
  	target.removeClass("scale-animation");
  	o.addClass('clickable');
  });
  
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

IoApp.directive('scaleAnimation', function($window, CONFIG, $timeout){
    return {
        link : function(scope, element, attrs){
            element.bind('click', function() {
                element.addClass('scale-animation');
            });
        }
    };
});

IoApp.directive('position', function ($window, AppService, CONFIG) {

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

