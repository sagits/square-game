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
var count = 80000;
var pointClick = 600;
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
			$("body").append(gameover);
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
		random = randomFromInterval(0, 19);
		aa = ["img/level3/1.jpg", "img/level3/2.jpg", "img/level3/3.jpg", "img/level3/4.jpg", "img/level3/5.jpg", "img/level3/6.jpg", "img/level3/7.jpg", "img/level3/8.jpg", "img/level3/9.jpg", "img/level3/10.jpg", "img/level3/11.jpg", "img/level3/12.jpg", "img/level3/13.jpg", "img/level3/14.jpg", "img/level3/15.jpg", "img/level3/16.jpg", "img/level3/17.jpg", "img/level3/18.jpg", "img/level3/19.jpg", "img/level3/20.jpg"];
		/*	if (random == 1) {
		 imageSrc = 'img/level3/1.jpg';
		 } else if (random == 2) {
		 imageSrc = 'img/level3/2.jpg';
		 } else if (random == 3) {
		 imageSrc = 'img/level3/3.jpg';
		 } */

		return aa[+random];
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
		allSrc = oneSrc;
		oneSrc = createImage();

		while (allSrc == oneSrc) {
			oneSrc = createImage();
		}
		$(".square").each(function() {
			if ($(this).attr('id') == myRandom) {
				$(this).attr("src", oneSrc);
			} else {
				$(this).attr("src", allSrc);
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
			changeImage();
			animateTime = animateTime - 30;
			count = count - 1000;
		}

	});

	$(document).on("click", "#gameover", function() {

		location.reload();
	});

});
