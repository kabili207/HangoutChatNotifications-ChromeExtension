/**********************************************************
*** FILE	: smuggler.js				***
*** REV		: 1.6					***
*** DEV		: me@nishantarora.in		***
*** DATE	: April 18,2013				***
*** DESC	: Smuggles data from chat frame to the	***
***		  document, so that a notification can	***
***		  created.				***
**********************************************************/
//setting a proper timeout
$(document).ready(function(){
	setTimeout(function(){}, 5000);
	setInterval(check_new_message, 100);	
	n= $("div").length;
	window_focus = false;	
	$(window).focus(function() {
		window_focus = true;
	}).blur(function() {
		window_focus = false;
	});
});
//counting difference in divs
n=-1;
divno=-1;
function check_new_message(){
	if(n==-1){
		n= $("div").length;
	}
	divno	= $("div").length;
	if(divno>n && n!==0){
		if(!window_focus){
			update_notifier();
		}
		n=divno;
	}
}
//updating the notification service running in background.js
function update_notifier(){
	// thumbnail
	var allThumbs	= $('img').filter(function(){
		return ($(this).width() ==32) && ($(this).height() ==32)
	});
	var reqThumb	= allThumbs[allThumbs.length-1].src;
	//message
	var message	= $('div.mC.Ew:last').text();
	//user
	var user	= $('div.AwFK8.Uw:last').text();
	console.log({img: reqThumb, user: user,update: message,url: document.referrer});
	chrome.extension.sendRequest({img: reqThumb, user: user,update: message,url: document.referrer});
}