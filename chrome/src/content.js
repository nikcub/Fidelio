/*
 Force-SSL

 Copyright 2010 	Nik Cubrilovic <nikcub@gmail.com>
			http://nikcub.appspot.com/

 BSD licensed.

 Forces SSL requests for certain sites for more security etc.
*/

(function (document) {

	var Force = {
		
		sites: ['facebook.com', 'www.facebook.com', 'www.twitter.com', 'twitter.com'],

		debugLevel: false,
		
		init: function (options) {
			if(arguments.length > 0 && options instanceof Object) {
				this.debugLevel = options.debug;
			}
			
			if((this.sites.indexOf(document.domain) > 0) && document.location.protocol != 'https:') {
				document.location = 'https://' + document.location.hostname + document.location.pathname + document.location.hash;
			}
		},

		chromeSender: function(rec, msg, cb) {
			msg = msg || "";
			cb = (typeof cb == 'undefined') ? function(x){return x;} : cb;
			chrome.extension.sendRequest({rec: rec, msg: msg}, cb);
		},
		
		get_host: function (url) {
			var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
			return url.match(re)[1].toString().toLowerCase();
		},
		
		getStorage: function (key) {
			var result = localStorage[key];
			if(typeof(result) == "undefined")
				return ['___z'];
			else
				return JSON.parse(result);
		},

		setStorage: function (key, value) {
			localStorage[key] = JSON.stringify(value);
		},
		
		debug: function (message) {
			if(this.debug) {
				console.log(message);
			}
		}
	};
	
	Force.init.prototype = Force;
	
	try {
		var options = { debug: true };
		Force = window.Force = new Force.init(options);
	} catch(Error) {
		console.error('Error: ' + arguments[0] + ' ' + Error.message);
		console.error(Error.stack);
	}
		
})(document);
