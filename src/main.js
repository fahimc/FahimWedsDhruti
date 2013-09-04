(function(window) {
	var currentVenue="locationContent";
	var countdown;
	var fader;
	var gMap;
	var navData=
	{
		0:{url:"home",top:0},
		1:{url:"venue",top:0},
		2:{url:"details",top:0},
		3:{url:"contact",top:0},
		4:{url:"rsvp",top:0}
	}
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		document.getElementById("soundPlayer").volume=0.2;
		startCountdown();
		initFader();
		createMap();
		//onSoundClicked();
		checkDeepLink();
		setViewTop();
		Utensil.addListener(window,"resize",onResize);
		Utensil.addListener(window,"scroll",onScroll);
	}
	function checkDeepLink()
	{
		
		if(location.hash)
		{
			var pageName = location.hash.replace("#","");
			for(var index in navData)
			{
				
				var item = navData[index].url;
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
		console.log("navigateTo",index);
		var children = document.getElementById("viewHolder").childNodes;
		var h=0;
		var count=0;
		for(var a=0;a<children.length;a++)
		{
			if(children[a].clientHeight)
			{
				
				if(children[a].id!="nav" && count==index)break;
				
				if(Utensil.stageWidth()<=1000|| children[a].id!="nav")
				{
				if(navData[count])navData[count].top = h;	
				h+=children[a].clientHeight;
					if(children[a].id!="nav")
					{
						
						count++;
					}
				}
			}
		}
		TweenLite.to( window,1,{scrollTo:{y:h,x:0}});
		location.hash =navData[index].url;
		
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
	function setViewTop()
	{
		var children = document.getElementById("viewHolder").childNodes;
		var h=0;
		var count=0;
		for(var a=0;a<children.length;a++)
		{
			if(children[a].clientHeight)
			{
				
				
				
				if(Utensil.stageWidth()<=1000|| children[a].id!="nav")
				{
				if(navData[count])navData[count].top = h;	
				h+=children[a].clientHeight;
					if(children[a].id!="nav")
					{
						
						count++;
					}
				}
			}
		}
		
	}
	function changePageName()
	{
		var holder = document.body;
		var page=0;
		for(var index in navData)
			{
				
				var item = navData[index];
				if(holder.scrollTop>= item.top )
				{
					
					
					page= index;
					
				}
				
				
			}
			
			location.hash =navData[page].url;
	}
	function onScroll()
	{
		changePageName();
	}
	function onResize()
	{
		if(gMap)gMap.center();
		setViewTop();
		
	}
	
	Main();
}
)(window);
