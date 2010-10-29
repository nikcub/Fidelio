# Fidelio

Forces secure connections and secure cookies on sites specified by the user in the options page.

By default twitter.com and facebook.com are enabled.

The method used means that there is no cookie leak in the initial HTTP request, since cookies are re-written with the secure flag set.

This means that when you first enable the extension, on some sites you will need to re-login.

## Version

Latest release is 1.0.4 (30th October 2009)

## Install

Click here to install for Chrome:

[http://nikcub.appspot.com/projects/fidelio.crx](http://nikcub.appspot.com/projects/fidelio.crx)

Give the extension permission, and click ok.

Go to the chrome extension page, and click on 'options' under Fidelio to add/remove sites to protect with SSL and secure cookies.

## Issues

Please log issues you find at:

[http://github.com/nikcub/fidelio/issues](http://github.com/nikcub/fidelio/issues)

or email me on nikcub at gmail.com

## Source

Source code for the project is on GitHub:

[http://github.com/nikcub/fidelio](http://github.com/nikcub/fidelio)

## Changelog

1.0.4	* new options page
		* fixed permissions on install error with some chrome
		* delete button in options page fix
		
## TODO

 * Rule engine
 * Check if HTTPS is available on adding a site
 * add site through browser button

## License

Copyright 2010 Nik Cubrilovic [http://nikcub.appspot.com]. All Rights Reserved.

Use of this source code is governed by a 3-clause BSD license.
See the LICENSE file for details.
