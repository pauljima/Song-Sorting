menu.children[0].addEventListener("click", resort, false);
menu.children[1].addEventListener("click", resort, false);
menu.children[2].addEventListener("click", resort, false);

function resort(evt) {
	menu.children[0].removeEventListener("click", resort, false);
	menu.children[1].removeEventListener("click", resort, false);
	menu.children[2].removeEventListener("click", resort, false);

	resetMenu();
	evt.target.style.opacity = "1";
	evt.target.style.fontWeight = "bold";
	evt.target.style.textTransform = "uppercase";

	if (evt.target.innerHTML == "Name") { sortBy = "name"; }
	else if (evt.target.innerHTML == "Song Length") { sortBy = "length"; }
	else if (evt.target.innerHTML == "Year") { sortBy = "year"; }

	redrawGrid();

	setTimeout(function() {
		menu.children[0].addEventListener("click", resort, false);
		menu.children[1].addEventListener("click", resort, false);
		menu.children[2].addEventListener("click", resort, false);
	}, (tl.duration() * 1000) / 2);
}

function resetMenu() {
	for (var i = 0; i < menu.children.length; i++) {
		var btn = menu.children[i];

		btn.style.opacity = "0.5";
		btn.style.fontWeight = "normal";
		btn.style.textTransform = "lowercase";
	}
}