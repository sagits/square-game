$(document).ready(function() {

	$("#exit").click(function() {
		navigator.app.exitApp();

	});
	
	$(document).on("mobileinit", function(){
    $.mobile.buttonMarkup.hoverDelay = 0;
});

$(document).on("mobileinit", function(){
    $.mobile.defaultPageTransition   = 'none';
    $.mobile.defaultDialogTransition = 'none';
});

});
