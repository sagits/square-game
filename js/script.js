$(document).bind("mobileinit", function() {
	$.mobile.defaultPageTransition = "none"
});

$(document).ready(function() {

	$("#exit").click(function() {
		navigator.app.exitApp();

	});

});
