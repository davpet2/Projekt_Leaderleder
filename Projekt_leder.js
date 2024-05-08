require([
    "esri/map",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "dojo/domReady!"
], function(Map, Graphic, Point, SimpleMarkerSymbol) {
    var map = new Map("mapDiv", {
        basemap: "streets",
        center: [17.151189, 60.676245],
        zoom: 8	
	});
	
		getBikingTrails();
    
	
	
    async function fetchData(file){
		const url = "https://raw.githubusercontent.com/davpet2/Projekt_Leaderleder/main/Biking_walking_no_elevation/";
		try{
			const response = await fetch(url + file);
			return response.json();
		} catch(error) {
			console.error("Error fetching data:", error);
		}
	}
	
	function getBikingTrails() {
		fetchData("Etapp_11_wgs84.json").then(getTrails);
		fetchData("Etapp_12_wgs84.json").then(getTrails);
		fetchData("Etapp_13_wgs84.json").then(getTrails);
		fetchData("Etapp_14_wgs84.json").then(getTrails);
		fetchData("Etapp_15_wgs84.json").then(getTrails);
		fetchData("Etapp_16_wgs84.json").then(getTrails);
		fetchData("Etapp_17_wgs84.json").then(getTrails);
		fetchData("Etapp_19_wgs84.json").then(getTrails);
		fetchData("Etapp_20_wgs84.json").then(getTrails);
		fetchData("Etapp_21_wgs84.json").then(getTrails);
		fetchData("Etapp_22_wgs84.json").then(getTrails);
		fetchData("Etapp_Slinga_11_1_wgs84.json").then(getTrails);
		fetchData("Etapp_Slinga_12_1_wgs84.json").then(getTrails);
		fetchData("Etapp_Slinga_12_2_inkl_kolkoja_wgs84.json").then(getTrails);
		fetchData("Etapp_Slinga_21_1_wgs84.json").then(getTrails);
		fetchData("test.json").then(getTrails);
	}
	
	function getTrails(data){
		let bikingLayer = new esri.layers.GraphicsLayer();
        map.addLayer(bikingLayer);
         
		data.posts.forEach(post => {
		const symbol = new esri.layers.PictureMarkerSymbol("bike.png", 10, 10);
		const lat = post.latitude;
		const lng = post.longitude;
		let point = new Point(lng, lat);
		let graphic = new Graphic(point, symbol);
		
		var info = new esri.InfoTemplate();
		info.setTitle("Cykelled");
		graphic.setInfoTemplate(info);
		bikingLayer.add(graphic);
    });
}

document.getElementById("1").addEventListener("click", getBikingTrails);
});
