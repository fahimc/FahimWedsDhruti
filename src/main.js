(function(window) {
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		Parallax.init();
		// Parallax.setStartPoint("view1","logo",{top:"-300px"})
		Parallax.setStartPoint("view2","venueContentHolder",{right:"-500px"})
		Parallax.setStartPoint("view4","us",{right:"-500px"})
	}

	Main();
}
)(window);
