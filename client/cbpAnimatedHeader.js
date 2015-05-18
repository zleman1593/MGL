/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */

	//Template.header.rendered = function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-trans' ),
		didScroll = false,
		changeHeaderOn = 500;
//------
	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}
//------
	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
	
		
		
			//$(".logo").addClass("hideLogo");
			$(".logoHidden").addClass("logoStay");
			$(".logoStay").removeClass("logoHidden");
		
		//$(".navLink").removeClass("blackNavbarLinks");
			//$(".navLink").addClass("whiteNavbarLinks");
				//classie.add( header, 'navbar-shrink' );
				$(".navbar-trans").removeClass('navbar-hidden');


		}
		else {
			//$(".logo").removeClass("hideLogo");
			
				$(".navbar-trans").addClass('navbar-hidden');
				$(".logoStay").addClass("logoHidden");
				$(".logoHidden").removeClass("logoStay");
				//$(".navLink").addClass("blackNavbarLinks");
			//$(".navLink").removeClass("whiteNavbarLinks")
		
				$(".navbar-fixed-top").removeClass('navbar-shrink');
		}
		didScroll = false;
	}
//------
	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

//};