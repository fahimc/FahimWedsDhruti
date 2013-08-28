/*
 * USAGE
 * Countdown('02/19/2012 10:1 AM', callback);
 */
var Countdown = function(d, callback) {
	this.init(d, callback);
};
(function() {

	var _ = Countdown.prototype;

	_.second = 1000;
	_.minute = 0;
	_.hour = 0;
	_.day = 0;
	_.timer = null;
	_.end = 0;
	_.callback = null;
	_.handler
	_.init = function(d, c) {

		this.minute = this.second * 60;
		this.hour = this.minute * 60;
		this.day = this.hour * 24;

		//rearrange date
		var arr = d.split("/");
		
		d = arr[1] + "/" + arr[0] + "/" + arr[2];

		this.end = new Date(d);
		

		this.callback = c;
		if (!this.callback)
			return;
		var root = this;
		this.handler = function() {
			root.ticker();
		};

	};
	_.start = function() {
		this.timer = setInterval(this.handler, 1000);
	}
	_.getEvent = function() {
		var event = {
			days : 0,
			hours : 0,
			minutes : 0,
			seconds : 0,
			ended : false
		};
		return event;
	}
	_.stop = function() {
		if(!this.timer)return;
		var event = this.getEvent();
		event.ended = true;
		clearInterval(this.timer);
		this.callback(event);
	}
	_.ticker = function() {
		var event = this.getEvent();
		var now = new Date();
		var distance = this.end - now;
		if (distance < 0) {

			this.stop();
			return;
		}

		
		event.days = Math.floor(distance / this.day);
		event.hours = Math.floor((distance % this.day) / this.hour);
		event.minutes = Math.floor((distance % this.hour) / this.minute);
		event.seconds = Math.floor((distance % this.minute) / this.second);

		this.callback(event);
	}
})();
