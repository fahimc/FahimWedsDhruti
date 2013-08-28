(function(window) {
	var currentVenue="locationContent";
	var countdown;
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		countdown=new Countdown('20/04/2014 3:0 PM',onCountDownTicker);
		countdown.start();
	}
	function onCountDownTicker(event)
	{
		
		 document.getElementById("c_days").innerHTML = event.days;
		 document.getElementById("c_hours").innerHTML = event.hours;
		  document.getElementById("c_mins").innerHTML =event.minutes;
		   document.getElementById("c_secs").innerHTML =event.seconds;
	}
	window.navigateTo=function(index)
	{
		var children = document.getElementById("viewHolder").childNodes;
		var h=0;
		var count=0;
		for(var a=0;a<children.length;a++)
		{
			if(children[a].clientHeight)
			{
				if(children[a].className!="divider" && count==index)break;
				h+=children[a].clientHeight;
				if(children[a].className!="divider")count++;
				
			}
		}
		TweenLite.to( document.body,1,{scrollTo:{y:h,x:0}});
		
	}
	window.changeVenueContent=function(id,title)
	{
		document.getElementById("venueNavTitle").innerHTML = title;
		if(currentVenue==id)return;
		TweenLite.to( document.getElementById(currentVenue),0.5,{css:{autoAlpha:0},onComplete:onHideVenueComplete});
		currentVenue=id;
		
	}
	function onHideVenueComplete()
	{
		TweenLite.to( document.getElementById(currentVenue),1,{css:{autoAlpha:1}});
	}
	Main();
}
)(window);
