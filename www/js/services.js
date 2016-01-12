/**
 * 
 */
/*
var isAppForeground = true;
    
function initAds() {
	if (admob) {
		var adPublisherIds = {
				ios : {
					banner : "ca-app-pub-3667370934581818/1249913482",
					//interstitial : "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII"
				},
				android : {
					banner : "ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB",
					//interstitial : "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII"
				}
		};
	  
		var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;
        
		admob.setOptions({
			publisherId: admobid.banner,
			bannerAtTop: false
			//interstitialAdId: admobid.interstitial,
			//tappxIdiOs:       "/XXXXXXXXX/Pub-XXXX-iOS-IIII",
			//tappxIdAndroid:   "/XXXXXXXXX/Pub-XXXX-Android-AAAA",
			//tappxShare:       0.5,
          
        });
 
        registerAdEvents();
        
	} else {
        alert('AdMobAds plugin not ready');
    }
}

function onAdLoaded(e) {
	if (isAppForeground) {
	  	if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
    		console.log("An interstitial has been loaded and autoshown. If you want to load the interstitial first and show it later, set 'autoShowInterstitial: false' in admob.setOptions() and call 'admob.showInterstitialAd();' here");
    	} else if (e.adType === admob.AD_TYPE_BANNER) {
    		console.log("New banner received");
    	}
  	}
}

function onPause() {
	if (isAppForeground) {
		admob.destroyBannerView();
		isAppForeground = false;
	}
}

function onResume() {
	if (!isAppForeground) {
		setTimeout(admob.createBannerView, 1);
    	setTimeout(admob.requestInterstitialAd, 1);
    	isAppForeground = true;
	}
}

// optional, in case respond to events
function registerAdEvents() {
	document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
	document.addEventListener(admob.events.onAdFailedToLoad, function (e) {});
	document.addEventListener(admob.events.onAdOpened, function (e) {});
	document.addEventListener(admob.events.onAdClosed, function (e) {});
	document.addEventListener(admob.events.onAdLeftApplication, function (e) {});
	document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) {});
  
	document.addEventListener("pause", onPause, false);
	document.addEventListener("resume", onResume, false);
}
    
function onDeviceReady() {
	document.removeEventListener('deviceready', onDeviceReady, false);
	initAds();
 
	// display a banner at startup
	admob.createBannerView();
    
	// request an interstitial
	//admob.requestInterstitialAd();
}
*/
eduApp.factory('AppService', function(CONFIG, $Utility, $timeout, $cordovaMedia, $state) {
     
    var factory = {};
    
    factory.addAdMob = function(){
    };
    
    factory.appendDownloadData = function(callback){
    	var fileData = $Utility.get('filenamedata');
        if(typeof fileData != 'undefined') {
        	require(downloadPath + fileData, function(){
        		callback ? callback() : null;
        	});        	
        } else {
        	callback ? callback() : null;
        }
    };
    
    factory.play = function(src, callback) {
    	if(audioObj != null) {
    		audioObj.pause();
    		audioObj = null;
    	}
    	if(typeof Media != 'undefined') {
    		 audioObj = new Media(src, function(){
        		 callback ? callback(audioObj) : null;
        	 });
    		 audioObj.play();
            // audio.setVolume(10);
    	 } else {
    		 audioObj = new Audio(src);
    		 audioObj.play();
    		 audioObj.addEventListener('ended', function(e) {
	        	callback ? callback(audioObj) : null;
			}, false);
    	 }
    };
    factory.stop = function(audio) {
        if(audio != null) {
            audio.stop();
        }
    };

    // Get data services
    factory.getContentByCategory = function($categoryId) {
    	var list = [];
    	if(typeof jsonData != 'undefined') {
    		if(typeof jsonData.news != 'undefined') {
				if(typeof jsonData.news[$categoryId] != 'undefined') {
					return jsonData.news[$categoryId];
				}
    		}
    	}
    	return list;
    };
    
    factory.getCategories = function(){
    	return (typeof jsonData != 'undefined') ? jsonData.categories : [];
    };
    
    factory.getRandomContentInList = function(list) {
    	return list[Math.floor(Math.random()*list.length)];
    };

    factory.getAttribute = function(os,attrName){
        var list = [];
        if(os.length == 1) {
            return os[0].getAttribute(attrName);
        }
        for(var k in os) {
            if(typeof os[k] == 'object') {
                data.push(os[k].getAttribute(attrName));
            }
        }
        return list;
    };
    
    factory.calculatorPosition = function($size){
    	var minus = 0;
    	if(CONFIG.iPhone4 == $size) {
        	minus = 30;
        } else if(CONFIG.iPhone5 == $size) {
        	minus = 45;
        } else if(CONFIG.iPhone6 == $size) {
        	minus = 50;
        } else if(CONFIG.iPhone6p == $size) {
        	minus = 60;
        } else if(CONFIG.iPad == $size) {
        	minus = 30;
        }
    	return minus;
    };
    
    factory.clearCache = function() {
        var success = function(status) {
            console.log('Message: ' + status);
        }
 
        var error = function(status) {
        	console.log('Error: ' + status);
        }
 
        window.cache.clear( success, error );
        window.cache.cleartemp();  
    };
    
    factory.correctImagePath = function($list){
    	var $me = this;
    	angular.forEach($list, function(item) {
    		if(item.image_name_updated != '') {
    			// item.image_name = CONFIG.DOWNLOAD_PATH +
				// item.image_name_updated;
				// var img = new Image();
				// img.src = (item.image_name_updated.indexOf(CONFIG.DOWNLOAD_PATH) == -1) ?
				// (CONFIG.DOWNLOAD_PATH + item.image_name_updated) : item.image_name_updated;
				// img.onload = function(){
				// item.image_name = (item.image_name_updated.indexOf(CONFIG.DOWNLOAD_PATH) ==
				// -1) ? (CONFIG.DOWNLOAD_PATH + item.image_name_updated) :
				// item.image_name_updated;
				// };
				// img.onerror = function(){
				// item.image_name = (item.image_name_updated.indexOf(CONFIG.PATH) == -1) ?
				// (CONFIG.PATH + item.image_name_updated) : item.image_name_updated;
				// };
    			
    			item.image_name = (downloadPath + item.image_name_updated);
    		} else {
    			item.image_name = CONFIG.PATH + item.image_name;
    		}
    		
    		// check sound
    		if(typeof item.sound != 'undefined') {
    			if(item.sound_updated != '') {
        			item.sound = CONFIG.DOWNLOAD_PATH + item.sound_updated;
        		} else {
        			item.sound = CONFIG.PATH + item.sound;
        		}   			
    		}
	    });
    	return $list;
    };
    factory.download = function(response, $index, callback){
    	if(typeof FileTransfer != 'undefined') {
    		var fileTransfer = new FileTransfer(),
    			$me = this,
    			list = response.log4AllData,
    			sourceUrl = list[$index].filename;
    		
    		var	filename = $me.getFilename(sourceUrl),
    			dest = CONFIG.DOWNLOAD_PATH + filename;
            fileTransfer.download(
        		sourceUrl,
        		dest,
                function(entry) {
        			var name = $me.getFilename(entry.toURL()),
        				dataEntry = null;
        			if(name.indexOf('.js') != -1) {
        				appUpdateData = name;
        				$Utility.set('filenamedata',appUpdateData);
        				
        				dataEntry = entry;
        				// Included file data
        				require(entry.toURL(), function(){
        					$categories = $me.getCategories();
        				});
        				
        			} else if(name.indexOf('.mp3') == -1) {
        				// angular.element(document.getElementsByClassName('main-container')).append('<img
						// src="'+downloadPath + name+'" width="50"
						// height="50"/>');
        			}
        			$index += 1;
        			var percent = Math.round(($index/list.length) * 100);
        			angular.element(document.querySelector('.percent-bg')).css({'width':((percent > 100) ? 100 : percent)+'%'});
        			
					if(percent >= 100) {
	        			$timeout(function(){
							angular.element(document.querySelector('.main-container')).addClass('hidden');
							angular.element(document.querySelector('.contents')).html('');
							angular.element(document.querySelector('.percent')).html('');
							$Utility.set('lastestUpdate',response.date);
							$state.go("tabs.home", {}, {reload: false});							
						}, 800);
						//callback ? callback(dataEntry) : null;
					}
					if(typeof list[$index] == 'object') {
						
						var sourceUrl = list[$index].filename,
							filename = $me.getFilename(sourceUrl),
							dest = CONFIG.DOWNLOAD_PATH + filename;
                    	// Continue download
						
						var times = 0;
						if(name.indexOf('.js') != -1) {
							times = 1000;
						} else {
							times = 0;	
						}
						$timeout(function(){
							$me.download(response, $index);
						}, times);
                    }
                },
                function(error) {
                	console.log("download error source " + error.source);
                	console.log("download error target " + error.target);
                	console.log("upload error code" + error.code);
                    
                },
                false,
                {
                    headers: {
                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    }
                }
            );
    	} else {
    		angular.element(document.querySelector('.main-container')).addClass('hidden');
			angular.element(document.querySelector('.contents')).html('');
			angular.element(document.querySelector('.percent')).html('');
			$state.go("tabs.home", {}, {reload: false});
    	}
    };
    
    factory.getFilename = function(sourceUrl){
    	var eles = sourceUrl.split('/'),
		filename = eles[eles.length - 1]
    	return filename;
    };
    factory.getFilenameDownloadPath = function(sourceUrl){
    	var eles = sourceUrl.split('/'),
    		path = '',
    		i = 0;
    	
    	angular.forEach(eles, function(item) {
    		if(i < eles.length - 1) {
    			path += item + '/';	
    		}
    		
    		i++;
    	});
    	return path;
    };
    factory.getFilenameExt = function(filename){
    	var eles = filename.split('.'),
			ext = eles[eles.length - 1]
    	return ext;
    };
    
    factory.checkRequestDownload = function(response, callback){
    	if(response.total > 0 && response.log4Data.length > 0) {
    		$Utility.set('lastupdated', response.date);
    		for(var i in response.log4Data) {
    			var item = response.log4Data[i];
    			if(typeof item == 'object') {
    				var name = this.getFilename(item.filename),
    					targetPath = CONFIG.DOWNLOAD_PATH + name;
    				
    				this.download(item.filename, targetPath, function(entry){
    					filename = entry.toURL();
                    });
    			}
    		}
    		callback ? callback() : null;
    	}
    };
    
    return factory;
});
