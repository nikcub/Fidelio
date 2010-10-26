(function(document) {


	siteStoreKey = 'fidelio.sitelist';

	FidelioBg = {

		init: function() {
			chrome.extension.onRequest.addListener(this.chromeListener);
			console.log('init fidelio');
		},

		chromeListener: function(request, sender, sendResponse) {
			var result = FidelioBg[request.rec](request.msg, sender);
			sendResponse(result);
		},

		getSiteList: function() {
			return this.getStorage(siteStoreKey);
		},

		getStorage: function (key) {
			var result = localStorage[key];
			if(typeof(result) == "undefined")
				return ["twitter.com", "facebook.com"];
			else
				return JSON.parse(result);
		},

		setStorage: function (key, value) {
			localStorage[key] = JSON.stringify(value);
		},
	};

	SiteList = {

		init: function() {

		}
	};

	FidelioBg.init.prototype = FidelioBg;
	SiteList.init.prototype = SiteList;

	try {
		FidelioBg = window.FidelioBg = new FidelioBg.init();
		SiteList = new SiteList.init();	
	} catch(Error) {
		console.error('Error: ' + arguments[0] + ' ' + Error.message);
		console.error(Error.stack);
	}

})(document);