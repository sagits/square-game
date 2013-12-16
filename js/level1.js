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
var animateTime = 500;
var x = 5;
var score = 0;
var count = 3000;
var pointClick = 300;
var scoreClick = 300;
$(document).ready(function() {

	var counter = setInterval(meutempo, 1);
	//1000 will  run it every 1 second

	function meutempo() {
		count = count - x;
		if (count <= 0) {
			clearInterval(counter);
			$("#timer").text(0 + "sec");
			gameover = '<div id="gameover"><h3>Game Over</h3></div>';
			//$("body").append(gameover);
			navigator.notification.confirm('Game over! Play again?', function(button) {
				if (button == 1) {
					window.location.href = "level4.html";
				} else {
					window.location.href = "index.html";
				}
			}, 'Game over', 'Play again,menu');
			return;
		}
		if ($("#score").text().indexOf('7000') > -1) {
			clearInterval(counter);
			navigator.notification.confirm('Congratulations! Do you wanna play the next level?', function(button) {
				if (button == 2) {
					window.location.href = "level2.html";
				} else {
					window.location.href = "index.html";
				}
			}, 'Congratulations', 'Menu,Play next level');

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
		thiscolor = $(this).css('backgroundColor');
		thiscolor = thiscolor.replace(/\s+/g, '');

		if (thiscolor == onecolor) {
			count += pointClick;
			score += scoreClick;
			$("#score").text("Score: " + score);
			random = randomFromInterval(0, 7);
			allcolor = onecolor;
			onecolor = createColor();
			$(".square").each(function() {

				if (this.id == random) {

					$(this).animate({
						backgroundColor : onecolor
					}, 50);
				} else {
					$(this).animate({
						backgroundColor : allcolor
					}, animateTime).promise().done(function() {
					});
				}
			})
			animateTime = animateTime - 30;
		} else {
			$(this).css('backgroundColor', '#000');
			random = randomFromInterval(0, 7);
			allcolor = onecolor;
			onecolor = createColor();
			$(".square").each(function() {

				if (this.id == random) {

					$(this).animate({
						backgroundColor : onecolor
					}, 50);
				} else {
					$(this).animate({
						backgroundColor : allcolor
					}, animateTime).promise().done(function() {
					});
				}
			})
			animateTime = animateTime - 30;
			count = count - 1000;
		}

	});

	$(document).on("click", "#gameover", function() {

		location.reload();
	});

});
