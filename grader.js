// https://developer.chrome.com/extensions/devguide
(function(){
	"use strict";

	function evaluateTabs(){
		chrome.tabs.query({"currentWindow": true}, function(tabs){
			for(var i=0;i<tabs.length;i++){
				var url = tabs[i].url;
				if(url.match("//.*google.*/")){
					chrome.tabs.remove(tabs[i].id);
					evaluateTabs();
					return;
				}
			}
		});
	}

	chrome.tabs.onUpdated.addListener(function(){
		evaluateTabs();
	});
})();
