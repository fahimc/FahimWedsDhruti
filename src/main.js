(function(window) {
	var currentVenue="locationContent";
	var countdown;
	var fader;
	var gMap;
	var navData=
	{
		0:"home",
		1:"venue",
		2:"details",
		3:"contact",
		4:"rsvp"
	}
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		startCountdown();
		initFader();
		createMap();
		onSoundClicked();
		checkDeepLink();
	}
	function checkDeepLink()
	{
		
		if(location.hash)
		{
			var pageName = location.hash.replace("#","");
			for(var index in navData)
			{
				var item = navData[index];
				if(item==pageName)
				{
					setTimeout(function(){navigateTo(index);},500);
					return;
				}
			}
		}
	}
	function createMap()
	{
		// var myOptions = {
        // center: new google.maps.LatLng(51.595681,-0.260637),
        // zoom: 15,
        // mapTypeId: google.maps.MapTypeId.ROADMAP,
        // disableDefaultUI: true
    // };
// 
    // var map = new google.maps.Map(document.getElementById("map"), myOptions);
    	gMap = new GoogleMap();
    	gMap.latLong(51.595681,-0.260637);
    	gMap.zoom(15);
    	gMap.build("map");
    	gMap.addMarker("Canvendish Banqueting Hall",51.595266,-0.260357,"resource/image/hall_small.png");
	}
	function initFader()
	{
		fader= new BackgroundFader(document.getElementById("backgroundFader"));
		fader.attach("bg1");
		fader.attach("bg2");
		fader.start();
		
	}
	function startCountdown()
	{
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
	window.onSoundClicked=function()
	{
		var mute=true;
		if(document.getElementById("soundPlayer").muted)
		{
			mute=false;
			document.getElementById("sound").className="";
		}else{
			mute=true;
			document.getElementById("sound").className="off";
		}
			document.getElementById("soundPlayer").muted=mute;
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
				
				if(children[a].id!="nav" && count==index)break;
			
				if(children[a].id!="nav")
				{
				h+=children[a].clientHeight;
					count++;
				}
			}
		}
		TweenLite.to( document.body,1,{scrollTo:{y:h,x:0}});
		location.hash =navData[index];
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
