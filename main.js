var tl,
	
	songNames = [],
	songTimes = [],
	songYears = [],

	sortBy = "name",
	init = true,

	coreOpacity = 0.25,
	inflateScale = 1.25,
	radius = 400;

window.addEventListener("load", drawGrid, false);

function drawGrid(evt) {
	// Reorganize grid by "sortBy"
	songs.sort(reorder);

	// Build invisible grid
	buildGrid(songs);

	// Animate grid onto screen
 	animateGrid();
}

function animateGrid() {
	for (var i = 0; i < main.children.length; i++) {
		var box = main.children[i];
		TweenLite.set(box, {scale:0.9});

		// box.addEventListener("mouseenter", rollOn, false);
		// box.addEventListener("mouseleave", rollOff, false);
	}

	// Animate boxes in
	tl = new TimelineLite();
	for (var i = 0; i < main.children.length; i++) {
		var box = main.children[i];
		tl.to(box, 0.5, {scale:1, opacity:coreOpacity, ease:Power4.easeOut}, "-=0.45");
	}

	// When boxes are done, add mouse events
	setTimeout(function() {
		for (var i = 0; i < main.children.length; i++) {
			var box = main.children[i];
			box.addEventListener("mouseenter", rollOn, false);
			box.addEventListener("mouseleave", rollOff, false);
		}
	}, (tl.duration() * 1000) - 500);
}

function buildGrid() {
	var newGrid = "",
		m,
		s;

	for (var i = 0; i < songs.length; i++) {
		m = Math.floor(songs[i].length / 60);
		s = songs[i].length - (m * 60);

		if (s < 10) s = "0" + s;

		newGrid += "<div class='box'>";
		newGrid += "<div class='corner cornerTL'></div>";
		newGrid += "<div class='corner cornerTR'></div>";
		newGrid += "<div class='corner cornerBL'></div>";
		newGrid += "<div class='corner cornerBR'></div>";
		newGrid += "<p class='song-title'>" + songs[i].name + "</p>";
		newGrid += "<p class='song-length'>" + m + ":" + s + "</p>";
		newGrid += "<p class='song-year'>" + songs[i].year + "</p>";
		newGrid += "</div>";
	}

	main.innerHTML = newGrid;
}

function reorder(a,b) {
	var newOrder = 0;

	if (sortBy == "name") {
		itemA = a.name.toUpperCase();
		itemB = b.name.toUpperCase();
	} else if (sortBy == "length") {
		itemA = a.length;
		itemB = b.length;
	} else if (sortBy == "year") {
		itemA = a.year;
		itemB = b.year;
	}

	if (itemA > itemB) newOrder = 1;
	else if (itemA < itemB) newOrder = -1;

	return newOrder;
}

function redrawGrid() {

	for (var i = 0; i < main.children.length; i++) {
		var box = main.children[i];

		box.removeEventListener("mouseenter", rollOn, false);
		box.removeEventListener("mouseleave", rollOff, false);

		TweenLite.to(box, 0.5, {scale:0.75, opacity:0, ease:Power4.easeOut}, "-=0.5");
	}

	setTimeout(function() {
		drawGrid();
	}, 500);
}

// Mouse stuff
function rollOn(evt) {
	TweenLite.to(evt.target, 0.5, {scale:inflateScale, opacity:1, ease:Power4.easeOut});

	var coreX = evt.target.offsetLeft + (evt.target.offsetWidth/2),
		coreY = evt.target.offsetTop + (evt.target.offsetHeight/2);

	for (var i = 0; i < main.children.length; i++) {
		var box = main.children[i],
			x = box.offsetLeft + (box.offsetWidth/2),
			y = box.offsetTop + (box.offsetHeight/2),

			dist = Math.sqrt(Math.pow(x - coreX, 2) + Math.pow(y - coreY, 2));

		if (dist <= radius && box != evt.target) {
			var p = (radius - dist) / radius;
			TweenLite.to(box, 0.5, {scale:1 + (p * (inflateScale - 1)), opacity:coreOpacity + (p * (1 - coreOpacity))});
		}


	}
}
function rollOff(evt) {
	// TweenLite.to(evt.target, 0.5, {scale:1, opacity:1, ease:Power4.easeOut});

	for (var i = 0; i < main.children.length; i++) {
		var box = main.children[i];
		TweenLite.to(box, 0.5, {scale:1, opacity:coreOpacity, ease:Power4.easeOut});
	}
}