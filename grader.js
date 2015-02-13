// https://developer.chrome.com/extensions/devguide
(function(){
	"use strict";

	function evaluateTabs(patterns){
		chrome.tabs.query({"currentWindow": true}, function(tabs){
			for(var i=0;i<tabs.length;i++){
				var url = tabs[i].url;
				if(!url.match(patterns)){
					chrome.tabs.remove(tabs[i].id);
					evaluateTabs(patterns);
					return;
				}
			}
		});
	}

	chrome.tabs.onUpdated.addListener(function(){
		chrome.storage.sync.get({
	        patterns: ".*",
	        enabled: true
	    }, function(items) {
	    	if(items.enabled){
		        evaluateTabs(items.patterns);
	    	}
	    });
	});
})();
