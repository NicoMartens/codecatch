	//is needed to set manually for zoom and border functionality
	var mapWidth = 13000;
	var mapHeight = 7583;

	var mapMinZoom = 4;
	var mapMaxZoom = 6;
	
	var map;

function mapInit(){
	
	//Keep Markers open
	     L.Map = L.Map.extend({
                openPopup: function(popup) {
                    //        this.closePopup();  // just comment this
                    this._popup = popup;

                    return this.addLayer(popup).fire('popupopen', {
                        popup: this._popup
                    });
                }
            });
	     //end of Keep Markers open

	map = L.map('map', {
		maxZoom: mapMaxZoom,
		minZoom: mapMinZoom,
		crs: L.CRS.Simple
	});
	


	var pointM = new L.point(mapWidth/2,mapHeight/2);      // point in the middle of the map
	var pointMInLocalCoords = map.unproject(pointM, mapMaxZoom);        //projects pointW in the local used coordinate system
  
	map.setView(pointMInLocalCoords, mapMinZoom);     //sets window center and initial zoom level

	var mapBounds = new L.LatLngBounds(         
	map.unproject([0, mapHeight], mapMaxZoom),     //south-west corner
	map.unproject([mapWidth, 0], mapMaxZoom));     //north-east corner
  
	map.setMaxBounds(mapBounds);      //we have to adjust the min zoom level to this bounds!!!

	L.tileLayer('mapTiles/{z}/{x}/{y}.png', {			
		minZoom: mapMinZoom, maxZoom: mapMaxZoom,
		bounds: mapBounds,
		noWrap: true          
	}).addTo(map);
	

	//for development only:

	//from here...

	var popup = L.popup();     

	function onMapClick(e) {
		//close showPos und showPoi bei klick in die map
		 // get Angular scope from the known DOM element
    f = document.getElementById('controller');
    scope = angular.element(f).scope();
    scope.$apply(function() {
        scope.showPos=false;
        scope.showPoi=false;
    }); 
	
		
	}

	map.on('click', onMapClick);

	// until here



	/***  little hack starts here ***/
	L.Map = L.Map.extend({
		openPopup: function(popup) {
			//        this.closePopup();  // just comment this
			this._popup = popup;
			return this.addLayer(popup).fire('popupopen', {
				popup: this._popup
			});
		}
	}); /***  end of hack ***/
}
