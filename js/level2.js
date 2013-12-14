document.addEventListener("backbutton", function() {
	navigator.notification.confirm('Do you want to quit', onConfirmQuit, 'Exit', 'Cancel');
}, true);

function onConfirmQuit(button) {
	if (button == "1") {
		navigator.app.exitApp();
	}
}

var lastrandom;
var onecolor;
var allcolor;
var oldcolor;
var animateTime = 500;
var animateOne = 150;
var x = 5;
var score = 0;
var currentOp;
var doing = false;
var rightblock = false;
var count = 4000;
var pointClick = 500;
var scoreClick = 300;
$(document).ready(function() {

	var counter = setInterval(meutempo, 1);
	//1000 will  run it every 1 second

	function meutempo() {
		//alert("aaa");
		count = count - x;
		if (count <= 0) {
			clearInterval(counter);
			//counter ended, do something here
			$("#timer").text(0 + "sec");
			gameover = '<div id="gameover"><h3>Game Over</h3></div>';
			$("body").append(gameover);
			return;
		}
		if ($("#score").text().indexOf('7000') > -1) {
			clearInterval(counter);
			navigator.notification.confirm('Congratulations! Do you wanna play again?', function(button) {
				if (button == 2) {
					window.location.href = "level1.html";
				} else {
					window.location.href = "index.html";
				}
			}, 'Congratulations', 'Menu,Play again');

		}

		$("#timer").text("Time: " + count + "sec");
	}

	changeColor(randomFromInterval(0, 7));

	function randomFromInterval(from, to) {
		random = Math.floor(Math.random() * (to - from + 1) + from);
		while (random == lastrandom) {
			random = Math.floor(Math.random() * (to - from + 1) + from);
		}
		lastrandom = random;
		return random;
	}

	function createColor() {
		color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
		return color;
	}

	function changeColor(squareNum) {

		allcolor = createColor();
		onecolor = createColor();
		while (allcolor == onecolor) {
			allcolor = createColor();
		}
		console.log(squareNum);
		$('.square').each(function(i, obj) {

			if (i == squareNum) {
				$(this).css("background-color", onecolor);
			} else {
				$(this).css("background-color", allcolor);
			}
		});

	}


	$(".square").click(function() {
		if (doing === false) {
			console.log(doing);
			doing = true;

			thiscolor = $(this).css('backgroundColor');
			thiscolor = thiscolor.replace(/\s+/g, '');

			oldcolor = allcolor;
			if (thiscolor == onecolor) {
				count += pointClick;
				score += scoreClick;
				$("#score").text("Score: " + score);
				random = randomFromInterval(0, 7);
				allcolor = onecolor;
				onecolor = createColor();

				$(".square").animate({
					backgroundColor : allcolor
				}, {
					queue : false,
					duration : animateTime
				}).promise().done(function() {
					doing = false;

				});
				$(this).stop().animate({
					backgroundColor : oldcolor
				}, {
					duration : 200
				}).promise().done(function() {

				});

				//	animateTime = animateTime - 30;
				rightblock = $(this);
				$(this).toggle("400");

			} else {

				count = count - 1000;
				random = randomFromInterval(0, 7);
				allcolor = onecolor;
				onecolor = createColor();

				$(".square").animate({
					backgroundColor : allcolor
				}, {
					queue : false,
					duration : animateTime
				}).promise().done(function() {
					doing = false;
					$(this).css("display", "block");
				});

				animateTime = animateTime + 30;
				//rightblock = $(this);
				$(this).toggle("explode");

			}

			if (rightblock !== false) {
				rightblock.toggle();

			} else {

				//$(this).toggle("400").promise().done(function() {});
			}

			$(this).stop().animate({
				backgroundColor : allcolor
			}, {
				queue : true,
				duration : 200
			}).promise().done(function() {
			});

			$("#" + random).stop().animate({
				backgroundColor : onecolor
			}, {
				queue : true,
				duration : animateOne
			}).promise().done(function() {

			});

			rightblock = false;

			//	$(this).toggle();

		}

		//	alert(doing);
	})

	$(document).on("click", "#gameover", function() {

		location.reload();
	});

});
