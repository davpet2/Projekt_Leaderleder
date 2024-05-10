require([
    "esri/map", 
    "esri/symbols/SimpleMarkerSymbol", 
    "esri/symbols/SimpleFillSymbol",
	"esri/symbols/PictureMarkerSymbol",
    "esri/graphic", 
    "esri/layers/GraphicsLayer",
    "esri/InfoTemplate", 
    "esri/geometry/Point", 
    "esri/geometry/Polygon",
    "dojo/_base/Color", 
    "dojo/domReady!"
  ], function(
    Map, 
    SimpleMarkerSymbol, 
    SimpleFillSymbol,
	PictureMarkerSymbol,
    Graphic, 
    GraphicsLayer, 
    InfoTemplate, 
    Point, 
    Polygon,
    Color
  ) {
    var map = new Map("mapDiv", {
        basemap: "streets",
        center: [17.46584, 60.28456],
        zoom: 9
	});
	
	var infoTemplate = new InfoTemplate("${name}", "Namn: ${name}");

    map.on("load", function() {
    function addCustomMarker(lat, lng, name) {
        var point = new Point(lng, lat);
        var symbol = new PictureMarkerSymbol({
            "url": "poi.png",
            "width": 15,
            "height": 15
        });
        var graphic = new Graphic(point, symbol);

        graphic.setAttributes({"name": name});
        
        graphic.setInfoTemplate(infoTemplate);
        map.graphics.add(graphic);
    }
		
		//Färnebofjärden
		addCustomMarker(60.14311, 16.48877, "Bårbyhällan");
		addCustomMarker(60.10663, 16.48095, "Båtsportklubben");
		addCustomMarker(60.13159, 16.50868, "Brattnäset");
		addCustomMarker(60.14203, 16.47466, "Dragsheden öst");
		addCustomMarker(60.14346, 16.47136, "Dragsheden väst");
		addCustomMarker(60.1187, 16.44909, "Göknäset");
		addCustomMarker(60.10404, 16.47415, "Östa Camping");
		addCustomMarker(60.10672, 16.47674, "Östa norr");
		addCustomMarker(60.10565, 16.47127, "Östa väst");
		addCustomMarker(60.12585, 16.47325, "Sandön");
		addCustomMarker(60.12755, 16.51035, "Skekarsbo");
		addCustomMarker(60.13012, 16.47824, "Strångnäs");
		
		//Gysinge
		addCustomMarker(60.17273, 16.5287, "Cafe Udden");
		addCustomMarker(60.16877, 16.48372, "Paddla Edsviken");
		addCustomMarker(60.15752, 16.5023, "Gärdsvekarna");
		addCustomMarker(60.17277, 16.53181, "Gysinge");
		addCustomMarker(60.15225, 16.47666, "Ista");
		addCustomMarker(60.15747, 16.48537, "Karlhomen");
		
		//Hedesundafjärden
		addCustomMarker(60.21955, 17.1938, "Åshuvudet");
		addCustomMarker(60.19891, 17.1291, "Festplatsen");
		addCustomMarker(60.20745, 17.3406, "Gnupe");
		addCustomMarker(60.17909, 17.222, "Hade");
		addCustomMarker(60.19183, 17.1946, "Korsnäset");
		addCustomMarker(60.22312, 17.2812, "Kvillanudden");
		//addCustomMarker(60.22302, 0, "Norra Sundet");
		addCustomMarker(60.22987, 17.5701, "Östveda");
		addCustomMarker(60.21013, 17.1919, "Sandsnäsbadet");
		addCustomMarker(60.1872, 17.2239, "Södra Sundet");
	});
	
    async function fetchNoElevationData(file){
		const url = "https://raw.githubusercontent.com/davpet2/Projekt_Leaderleder/main/Biking_walking_no_elevation/";

		const response = await fetch(url + file);
		return response.json();
	}
	
	    async function fetchElevationData(file){
		const url = "https://raw.githubusercontent.com/davpet2/Projekt_Leaderleder/main/biking_walking_with_elevation/";

		const response = await fetch(url + file);
		return response.json();
	}
	
	function getNoElevationTrails() {
		fetchNoElevationData("Etapp_11_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_12_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_13_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_14_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_15_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_16_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_17_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_19_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_20_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_21_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_22_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_Slinga_11_1_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_Slinga_12_1_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_Slinga_12_2_inkl_kolkoja_wgs84.json").then(showTrails);
		fetchNoElevationData("Etapp_Slinga_21_1_wgs84.json").then(showTrails);
		fetchNoElevationData("test.json").then(showTrails);
	}
	
	function getElevationTrails() {
		fetchElevationData("Biking_elevation161008.json").then(showTrails);
		fetchElevationData("Walk_elevation_123547.json").then(showTrails);
		fetchElevationData("Walk_elevation_151851.json").then(showTrails);
	}
	
	function showTrails(data){
		let bikingLayer = new GraphicsLayer();
        map.addLayer(bikingLayer);
         
		data.posts.forEach(post => {
		const marker = new PictureMarkerSymbol("marker.png", 9, 9);
		const lat = post.latitude;
		const lng = post.longitude;
		let point = new Point(lng, lat);
		let graphic = new Graphic(point, marker);
		
		var info = new InfoTemplate();
		info.setTitle("Cykel- och vandringsleder");
		graphic.setInfoTemplate(info);
		bikingLayer.add(graphic);
    });
}

document.getElementById("button1").addEventListener("click", getNoElevationTrails);

document.getElementById("button2").addEventListener("click", getElevationTrails);
});
document.getElementById("button1").addEventListener("click", getNoElevationTrails);

document.getElementById("button2").addEventListener("click", getElevationTrails);
});
