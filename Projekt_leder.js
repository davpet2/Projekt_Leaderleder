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
	
    var infoTemplate = new InfoTemplate("${name}", "<b>Namn:</b> ${name}<br/><img src='${Bild}' width='120' height='100'><br/><b>Beskrivning:</b> ${Beskrivning}");

    map.on("load", function() {
        function addCustomMarker(lat, lng, name, picture, description) {
            var point = new Point(lng, lat);
            var symbol = new PictureMarkerSymbol({
                "url": "poi.png",
                "width": 15,
                "height": 15
            });
            var graphic = new Graphic(point, symbol);

            graphic.setAttributes({"name": name, "Bild": picture, "Beskrivning": description});
        
            graphic.setInfoTemplate(infoTemplate);
            map.graphics.add(graphic);
        }
		
		//Färnebofjärden
		addCustomMarker(60.14311, 16.48877, "Bårbyhällan", "Barbyhallan.png", "Rastplats");
		addCustomMarker(60.10663, 16.48095, "Båtsportklubben", "Batsportklubben.png", "Rastplats");
		addCustomMarker(60.13159, 16.50868, "Brattnäset", "Brattnaset.png", "Rastplats");
		addCustomMarker(60.14203, 16.47466, "Dragsheden öst", "DragshedenOst.png", "Rastplats");
		addCustomMarker(60.14346, 16.47136, "Dragsheden väst", "DragshedenVast.png", "Rastplats");
		addCustomMarker(60.1187, 16.44909, "Göknäset", "Goknaset.png", "Rastplats");
		addCustomMarker(60.10404, 16.47415, "Östa Camping", "OstaCamping.png", "Rastplats");
		addCustomMarker(60.10672, 16.47674, "Östa norr", "OstaNorr.png", "Rastplats");
		addCustomMarker(60.10565, 16.47127, "Östa väst", "OstaVast.png", "Rastplats");
		addCustomMarker(60.12585, 16.47325, "Sandön", "Sandon.png", "Naturvärde");
		addCustomMarker(60.12755, 16.51035, "Skekarsbo", "Skekarsbo.png", "Rastplats");
		addCustomMarker(60.13012, 16.47824, "Strångnäs", "Strangnas.png", "Rastplats");
		
		//Gysinge
		addCustomMarker(60.17273, 16.5287, "Cafe Udden", "CafeUdden.png", "Hej");
		addCustomMarker(60.16877, 16.48372, "Paddla Edsviken", "PaddlaEdsviken.png", "Hej");
		addCustomMarker(60.15752, 16.5023, "Gärdsvekarna", "Gardsvekarna.png", "Hej");
		addCustomMarker(60.17277, 16.53181, "Gysinge", "Gysinge.png", "Hej");
		addCustomMarker(60.15225, 16.47666, "Ista", "Ista.png", "Hej");
		addCustomMarker(60.15747, 16.48537, "Karlhomen", "Karlholmen.png", "Hej");
		
		//Hedesundafjärden
		addCustomMarker(60.21955, 17.1938, "Åshuvudet", "Ashuvudet.png", "Hej");
		addCustomMarker(60.19891, 17.1291, "Festplatsen", "Festplatsen.png", "Hej");
		addCustomMarker(60.20745, 17.3406, "Gnupe", "Gnupe.png", "Hej");
		addCustomMarker(60.17909, 17.222, "Hade", "Hade.png", "Hej");
		addCustomMarker(60.19183, 17.1946, "Korsnäset", "Korsnaset.png", "Hej");
		addCustomMarker(60.22312, 17.2812, "Kvillanudden", "Kvillanudden.png", "Hej");
		//addCustomMarker(60.22302, 0, "Norra Sundet");
		addCustomMarker(60.22987, 17.5701, "Östveda", "Ostveda.png", "Hej");
		addCustomMarker(60.21013, 17.1919, "Sandsnäsbadet", "Sandsnasbadet.png", "Hej");
		addCustomMarker(60.1872, 17.2239, "Södra Sundet", "SodraSundet.png", "Hej");
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
