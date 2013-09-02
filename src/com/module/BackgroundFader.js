var BackgroundFader=function(parent){
	this.init(parent);
};
(function()
{
	var _ = BackgroundFader.prototype;
	
	_.holder;
	_.fader1;
	_.fader2;
	_.fadeClasses=[];
	_.currentIndex=0;
	_.delay=5;
	_.duration=2;
	_.stopCalled=false;
	_.init=function(parent)
	{
		this.holder = parent;
		this.build();
	}
	_.build=function()
	{
		this.fader1=document.getElementById("fader1");
		this.fader2=document.getElementById("fader2");
		
	}
	_.attach=function(className)
	{
		this.fadeClasses.push(className);
	}
	_.start=function()
	{
		if(this.holder && this.fader1)
		{
			
			//this.fader1.className="backgroundCover "+this.fadeClasses[this.currentIndex];
			if(this.fadeClasses[this.currentIndex+1])
			{
				this.currentIndex++;
				this.fadeBG();
			}
			
			
		//	TweenLite.to(this.fader2,1,{css:{autoAlpha:1},delay:2,onComplete:this.onFade1HideComplete,onCompleteScope:this});
		}
		
	}
	_.fadeBG=function()
	{
		if(this.currentIndex>=this.fadeClasses.length)this.currentIndex=0;
		
		var fader;
		var opacity=0;
		
		if(this.fader1.style.visibility=="hidden")
		{
			fader=this.fader1;
			opacity=1;
			this.fader1.className="backgroundCover "+this.fadeClasses[this.currentIndex];
		}else{
			this.fader2.style.visibility="visible";
			this.fader2.className="backgroundCover "+this.fadeClasses[this.currentIndex];
			fader=this.fader1;
		}
		
		
		TweenLite.to(fader,this.duration,{css:{autoAlpha:opacity},delay:this.delay,onComplete:this.onFade1HideComplete,onCompleteScope:this});

		
	}
	_.onFade1HideComplete=function()
	{
		
		if(this.stopCalled)
		{
			this.stopCalled=false;
			return;
		}
		this.currentIndex++;
			this.fadeBG();
	}
	_.stop=function()
	{
		this.stopCalled=true;
	}
})();
