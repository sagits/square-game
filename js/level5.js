document.addEventListener("backbutton", function() {
	navigator.notification.confirm('Do you want to quit', onConfirmQuit, 'Exit', 'Cancel');
}, true);

function onConfirmQuit(button) {
	if (button == "1") {
		navigator.app.exitApp();
	}
}

var lastrandom;
var oneSrc;
var allSrc;
var animateTime = 500;
var x = 5;
var score = 0;
var count = 10000;
var pointClick = 600;
var scoreClick = 300;
var lastImage;
$(document).ready(function() {
	alert("blabla");

	function preloadImage() {
		images = ["img/level4/1.jpg", "img/level4/2.jpg", "img/level4/3.jpg", "img/level4/4.jpg", "img/level4/5.jpg", "img/level4/6.jpg", "img/level4/7.jpg", "img/level4/8.jpg", "img/level4/9.jpg", "img/level4/10.jpg", "img/level4/11.jpg", "img/level4/12.jpg", "img/level4/13.jpg", "img/level4/14.jpg", "img/level4/15.jpg", "img/level4/16.jpg", "img/level4/17.jpg", "img/level4/18.jpg", "img/level4/19.jpg", "img/level4/20.jpg", "img/level4/21.jpg"];
		$(images).each(function() {
			$('<img/>')[0].src = this;
			// Alternatively you could use:
			// (new Image()).src = this;
		});
	}

	// Usage:

	preloadImage();

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
					window.location.href = "level3.html";
				} else {
					window.location.href = "index.html";
				}
			}, 'Game over', 'Play again,menu');
			return;
		}
		if ($("#score").text().indexOf('10000') > -1) {
			clearInterval(counter);
			navigator.notification.confirm('Congratulations! Do you wanna play the next level?', function(button) {
				if (button == 2) {
					window.location.href = "level4.html";
				} else {
					window.location.href = "index.html";
				}
			}, 'Congratulations', 'Menu,Play next level');

		}

		$("#timer").text("Time: " + count + "sec");
	}

	firstImage(randomFromInterval(0, 7));

	function randomFromInterval(from, to) {
		random = Math.floor(Math.random() * (to - from + 1) + from);
		while (random == lastrandom) {
			random = Math.floor(Math.random() * (to - from + 1) + from);
		}
		lastrandom = random;
		return random;
	}

	function createImage() {
		random = randomFromInterval(0, 20);
		images = ["img/level4/1.jpg", "img/level4/2.jpg", "img/level4/3.jpg", "img/level4/4.jpg", "img/level4/5.jpg", "img/level4/6.jpg", "img/level4/7.jpg", "img/level4/8.jpg", "img/level4/9.jpg", "img/level4/10.jpg", "img/level4/11.jpg", "img/level4/12.jpg", "img/level4/13.jpg", "img/level4/14.jpg", "img/level4/15.jpg", "img/level4/16.jpg", "img/level4/17.jpg", "img/level4/18.jpg", "img/level4/19.jpg", "img/level4/20.jpg", "img/level4/21.jpg"];
		/*	if (random == 1) {
		 imageSrc = 'img/level3/1.jpg';
		 } else if (random == 2) {
		 imageSrc = 'img/level3/2.jpg';
		 } else if (random == 3) {
		 imageSrc = 'img/level3/3.jpg';
		 } */

		return images[+random];
	}

	function firstImage(squareNum) {

		allSrc = createImage();
		oneSrc = createImage();
		while (allSrc == oneSrc) {
			allSrc = createImage();
		}

		$('.square').each(function(i, obj) {

			if (i == squareNum) {
				$(this).attr("src", oneSrc);
			} else {
				$(this).attr("src", allSrc);
			}
		});

	}

	function changeImage() {

		myRandom = randomFromInterval(0, 7);
		lastImage = allSrc;
		allSrc = oneSrc;
		oneSrc = createImage();

		while (allSrc == oneSrc || oneSrc == lastImage) {
			oneSrc = createImage();
		}
		$(".square").each(function() {
			if ($(this).attr('id') == myRandom) {
				$(this).animate({
					opacity : 0.5
				}, '800', function() {
					$(this).attr('src', oneSrc);
					$(this).animate({
						opacity : 1
					}, '800');
					//$(this).fadeIn('fast');
				});

			} else {
				$(this).animate({
					opacity : 0.5
				}, '400', function() {
					$(this).attr('src', allSrc);
					$(this).animate({
						opacity : 1
					}, '400');
					//$(this).fadeIn('fast');
				});
			}
		})
	}

	function changeScoreTime() {
		count += pointClick;
		score += scoreClick;
		$("#score").text("Score: " + score);
	}


	$(".square").click(function() {
		thisSrc = $(this).attr('src');

		if (thisSrc == oneSrc) {
			changeScoreTime();
			changeImage();
			animateTime = animateTime - 30;
		} else {
			$(this).effect('explode');
			$(this).fadeIn();
			changeImage();
			animateTime = animateTime - 30;
			count = count - 1000;
		}

	});

	$(document).on("click", "#gameover", function() {

		location.reload();
	});

});
