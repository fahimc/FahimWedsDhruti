var GoogleMap = function() {
};
(function() {
	var _ = GoogleMap.prototype;

	_.lat = 0;
	_.long = 0;
	_._latlong = null;
	_._zoom = 0;
	_.mapTypeId
	_.disableDefaultUI = true;
	_.holderId = "";
	_.map;
	_.latLong = function(lat, long) {
		if (lat != undefined && long != undefined) {
			this.lat = lat;
			this.long = long;
			this._latlong = new google.maps.LatLng(lat, long);
		}
		return this._latlong;
	}
	_.zoom = function(val) {
		if (val != undefined)
			this._zoom = val;
		return this._zoom;
	}
	_.build = function(holderId) {
		this.holderId = holderId;
		this.mapTypeId = google.maps.MapTypeId.ROADMAP;
		var myOptions = {
			center : this.latLong(),
			zoom : this.zoom(),
			 scaleControl: true,
			 mapTypeControl: false,
			 streetViewControl: false,
			 panControl: false,
			mapTypeId : this.mapTypeId
		};

		this.map = new google.maps.Map(document.getElementById(holderId), myOptions);
	}
	_.addMarker = function(title,lat,long,iconURL) {
		var marker = new google.maps.Marker({
			position : new google.maps.LatLng(lat, long),
			map:this.map,
			title : title,
			icon:iconURL?iconURL:null
		});

		// To add the marker to the map, call setMap();
		marker.setMap(this.map);
	}
	_.center=function()
	{
		this.map.setCenter(this.latLong());
	}
})();

