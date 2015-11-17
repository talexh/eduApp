/**
 * 
 */

IoApp.factory('AppService', function(CONFIG) {
     
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
    
    return factory;
});
