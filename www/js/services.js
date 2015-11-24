/**
 * 
 */

eduApp.factory('AppService', function(CONFIG, $localstorage) {
     
    var factory = {};
    
    factory.play = function(src, callback) {
    	 var audio = null;
    	 if(typeof Media != 'undefined') {
    		 audio = new Media(src, function(){
        		 callback ? callback(audio) : null;
        	 });
            audio.play();
            //audio.setVolume(10);
    	 } else {
    		 audio = new Audio(src);
    		 audio.play();
    		 audio.addEventListener('ended', function(e) {
	        	callback ? callback(audio) : null;
			}, false);
    	 }
    	 
        return audio;
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
    
    factory.download = function(sourceUrl, targetPath, callback){
    	if(typeof FileTransfer != 'undefined') {
    		var fileTransfer = new FileTransfer();
            
            fileTransfer.download(
        		sourceUrl,
        		targetPath,
                function(entry) {
                    console.log("download complete: " + entry.toURL());
                    callback ? callback(entry) : null;
                    //angular.element(document.getElementsByClassName('append-container')).append('<img src="'+entry.toURL()+'" width="150" height="auto"/>');
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
    	}
    };
    
    factory.getFilename = function(filename){
    	return filename.substring(filename.lastIndexOf('/') + 1, filename.length);
    };
    
    factory.checkRequestDownload = function(response, callback){
    	if(response.total > 0 && response.log4Data.length > 0) {
    		$localstorage.set('lastupdated', response.date);
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
