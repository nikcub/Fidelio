/*
	Copyright 2010 Nik Cubrilovic [http://nikcub.appspot.com]. All Rights Reserved.

	Use of this source code is governed by a 3-clause BSD license.
	See the LICENSE file for details.
*/

(function (document) {

	var Fidelio = {
		
		siteList: [],
		
		debugLevel: false,
		
		startTime: false,
		
		init: function (options) {
			
			if(arguments.length > 0 && options instanceof Object) {
				this.debugLevel = options.debug;
			}
			
			this.chromeSender('getSiteList', null, this.getSiteList);
			
			
		},

		onEnable: function(ext) {
			// console.log(ext);
		},
		

		getSiteList: function(data) {
			Fidelio.siteList = data;
			if(window == window.top)
				Fidelio.checkSite();
		},
		
		checkSite: function() {
			if(this.siteList.length < 1)
				return false;
			
			if(document.location.protocol != 'https:' && this.siteMatch(document.domain)) {
				document.location = 'https://' + document.location.hostname + document.location.pathname + document.location.search + document.location.hash;
			}	
		},
		
		chromeSender: function(rec, msg, cb) {
			msg = msg || "";
			cb = (typeof cb == 'undefined') ? function(x){return x;} : cb;
			chrome.extension.sendRequest({rec: rec, msg: msg}, cb);
		},
		
		siteMatch: function(hostname) {
			for(site in this.siteList) {
				if(!this.hostMatch(this.siteList[site], hostname))
					return true;
			}
			return false;
		},
		
		hostMatch: function(src1, src2) {
			var url1 = this.reverseString(src1);
			var url2 = this.reverseString(src2);
			var sub = (url1.length < url2.length) ? url1 : url2;
			
			return (url1.substr(0, sub.length) != url2.substr(0, sub.length));
		},
		
		reverseString: function (str) {
			return str.split('').reverse().join('');
		},
		
		getHost: function (url) {
			var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
			return url.match(re)[1].toString().toLowerCase();
		},
		
		getStorage: function (key) {
			var result = localStorage[key];
			if(typeof(result) == "undefined")
				return [];
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
		},
		
		logTime: function Timer() {
		  this.start_ = new Date();

		  this.elapsed = function() {
		    return (new Date()) - this.start_;
		  }

		  this.reset = function() {
		    this.start_ = new Date();
		  }
		}
	};
	
	Fidelio.init.prototype = Fidelio;
	
	try {
		var options = { debug: true };
		Fidelio = window.Fidelio = new Fidelio.init(options);
	} catch(Error) {
		console.error('Error: ' + arguments[0] + ' ' + Error.message);
		console.error(Error.stack);
	}
		
})(document);
