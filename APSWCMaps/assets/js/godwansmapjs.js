var selectitdadistrictid = "";
var godwansgistdata = "";
var geoXml = null;
var geoXmlDoc = null;
var geoXml1 = null;
var geoXml2 = null;
var geoXml4 = null;
var geoXml5 = null;
var geoXmlDoc1 = null;
var geoXmlDoc2 = null;
var geoXmlDoc4 = null;
var geoXmlDoc5 = null;
var map = null;
var markers = [];
var HouseholdDatamarker = [];
var litilltmarker = [];
var marker = [];
var maptypeclear = google.maps.MapTypeId.ROADMAP;
var mapset = {
    mapTypeId: maptypeclear
};
var myLatLng = null;
var myGeoXml3Zoom = true;
var sidebarHtml = "";
var infowindow = null;
var kmlLayer = null;
var filename = "";
var geocoder = new google.maps.Geocoder();

$(document).ready(function () { initialize(); });

function initialize() {

    $("#loadingtext").show();
    $("#lbllegend").html("STATE");
    // MainLegend();
    sessionStorage.setItem("load", "dist");
    //callservermandal();
    myLatLng = new google.maps.LatLng(15.573731, 79.9345364);
    var zoom = 6;
    var maptype = google.maps.MapTypeId.ROADMAP;

    var myOptions = {
        zoom: zoom,
        center: myLatLng,

        mapTypeId: maptype
    };

    //kml load dist
    map = new google.maps.Map(document.getElementById("map"),
          myOptions);
    var src1 = '';



    alldistitdabound();

    infowindow = new google.maps.InfoWindow({});

    var zoomlev = map.getZoom();


    $("#loadingtext").hide();

};


function alldistitdabound() {

    var godwanskml = "../assets/kml/95.kml";

    delete geoXml;
    delete geoXml1;
    delete geoXml2;


    geoXml = new geoXML3.parser({

        singleInfoWindow: true,
        afterParse: useTheDatanewload
    });
    geoXml.parse(godwanskml);




}

function useTheDatanewload(doc) {


    var currentBounds = map.getBounds();
    geoXmlDoc = doc[0];
    $("drpitda").empty();
    for (var i = 0; i < geoXmlDoc.placemarks.length; i++) {
        var placemark = geoXmlDoc.placemarks[i];

        if (placemark.polygon) {
            if (currentBounds.intersects(placemark.polygon.bounds)) {
                //makeSidebarPolygonEntry(i);
            }
            var normalStyle = {
                strokeColor: placemark.polygon.get('strokeColor'),
                strokeWeight: placemark.polygon.get('strokeWeight'),
                strokeOpacity: placemark.polygon.get('strokeOpacity'),
                fillColor: placemark.polygon.get('fillColor'),
                fillOpacity: placemark.polygon.get('fillOpacity')
            };
            placemark.polygon.normalStyle = normalStyle;


        }

        if (selectitdadistrictid != "") {
            if (placemark.name != null) {
                if (placemark.name.split(',')[2] == selectitdadistrictid) {
                    geoXmlDoc.placemarks[i].polygon.setMap(map);
                    highlightPoly_load(placemark.polygon, i);
                    map.setZoom(8);

                }
            }

        }

        else {
            geoXmlDoc.placemarks[i].polygon.setMap(map);
            highlightPoly_load(placemark.polygon, i);
            map.setZoom(6);

        }


    }


    $("#preloader").hide();

};

function highlightPoly_load(poly, polynum) {

    var colourcode = ""; var strokeColor = "";
    colourcode = "#ec4842"; strokeColor = "#060606";
    poly.setOptions({ fillColor: colourcode, strokeColor: strokeColor, fillOpacity: 0.11, strokeWidth: 5 });
    google.maps.event.addListener(poly, "mouseover", function (e) {

    });
    google.maps.event.addListener(poly, "click", function (e) {




    });

    google.maps.event.addListener(poly, "mouseout", function () {
        poly.infoWindow.close();
    });
    google.maps.event.addListener(poly, "rightclick", function (e) {
        if (geoXmlDoc.placemarks[polynum].polygon) {
            // map.fitBounds(geoXmlDoc.placemarks[polynum].polygon.bounds);
            if (e && e.latLng) {
                infowindow.setPosition(e.latLng);
            } else {
                infowindow.setPosition(placemark.polygon.bounds.getCenter());
            }
            infowindow.setContent('<div class="geoxml3_infowindow"><h4>Name :' + geoXmlDoc.placemarks[polynum].polygon.title.split(',')[0] +
                       '</h4><div></div></div>');
            infowindow.open(map);
        }

    });
}


function Godwanslatlongsdata(districtid, typeofdistrictselection) {
    var map = null;
    var location = null;
    var village = "";
    var result = [];

    $.ajax(
   {
       type: 'POST',
       contentType: 'application/json; charset=utf-8',
            url: '../api/LatLong/Latlongslist',
       data: "{'DistrictId':'" + districtid + "','typeofselectionvalue':'" + typeofdistrictselection + "'}",
       dataType: "json",
       success: function (response) {

           var dist = response.itdalist;
           godwansgistdata = dist;

           Godwansdatalist(dist)

       },
       error: function (result) {
           alert("Error");
       }

   });



}


function Godwansdatalist(godwanslist) {

    var Rbklist = [];
    var locations = [];
    var locations1 = [];
    var locations2 = [];
    var locations3 = [];

    Rbklist = godwanslist;
    if (Rbklist.length == 0) {
        alert('No data found');
    }

    var arr = [];
    var startPt = "";
    var endPt = "";
    var P1 = "";
    var P2 = "";
    var CP1 = "";
    var CP2 = "";

    // add code start
    var features = [];
    var marker, i;
    var infowindow = new google.maps.InfoWindow();
    
    var iconBase = '../assets/images/';
    var icons = {};
    icons = {

        1: {
            icon: iconBase + 'A_Agriculture_god.svg'
        },
        2: {
            icon: iconBase + 'A_Resourcecentre_god.svg'
        },
        3: {
            icon: iconBase + 'A_Bus Stop_god.svg'
        },
        4: {
            icon: iconBase + 'A_Bus Stop_god.svg'
        },
        5: {
        icon: iconBase + 'A_Bus Stop_god.svg'
    }


    };
    // alert("Rbklist.length --->" + Rbklist.length);
    for (var i = 0; i < Rbklist.length; i++) {
        var haplocations = [];
        //  var obj = JSON.parse(Rbklist[i]);
        //alert(obj.Lattitude);

        haplocations.push(Rbklist[i].Latitude, Rbklist[i].Longitude, Rbklist[i].DISTRICT_NAME, Rbklist[i].REGION_NAME, Rbklist[i].WAREHOUSE_NAME, Rbklist[i].WAREHOUSE_TYPE, Rbklist[i].CAPACITY, Rbklist[i].MANAGER_NAME, Rbklist[i].MOBILE, Rbklist[i].ACTIVE_STATUS);
        if (Rbklist[i].WAREHOUSE_TYPE_CODE == 1) {
            locations1.push(Rbklist[i].WAREHOUSE_TYPE_CODE);
        }
        else if (Rbklist[i].WAREHOUSE_TYPE_CODE == 2) {
            locations2.push(Rbklist[i].WAREHOUSE_TYPE_CODE);
        }
        else if (Rbklist[i].WAREHOUSE_TYPE_CODE == 3 || Rbklist[i].WAREHOUSE_TYPE_CODE == 4 || Rbklist[i].WAREHOUSE_TYPE_CODE == 5) {
            locations3.push(Rbklist[i].WAREHOUSE_TYPE_CODE);
        }

        locations.push(haplocations);

        features.push({ position: new google.maps.LatLng(Rbklist[i].Latitude, Rbklist[i].Longitude), type: Rbklist[i].WAREHOUSE_TYPE_CODE });








    }

    var l1 = locations1.length;
    var l2 = locations2.length;
    var l3 = locations3.length;
    $("#labelapswc").text(l1);
    $("#labelogf").text(l2);
    $("#labelpg").text(l3);
    var pt = "";
    var DISTRICT = $("#AllDistrict").val();
    if (DISTRICT != "all") {
        if (selectitdadistrictid == "505") {
            pt = new google.maps.LatLng(17.480597331147944, 81.87594137895124);
        }
        else if (selectitdadistrictid == "503") {
            pt = new google.maps.LatLng(13.178291906723933, 78.90231354687502);
        }
        else if (selectitdadistrictid == "502") {
            pt = new google.maps.LatLng(14.352055901404674, 77.54000885937502);
        }
        else if (selectitdadistrictid == "515") {
            pt = new google.maps.LatLng(14.352055901404674, 79.73727448437502);
        }
        else if (selectitdadistrictid == "504") {
            pt = new google.maps.LatLng(14.309478038192811, 78.85836823437502);
        }
        else if (selectitdadistrictid == "511") {
            pt = new google.maps.LatLng(15.286682377955428, 78.02340729687502);
        }
        else if (selectitdadistrictid == "517") {
            pt = new google.maps.LatLng(15.66784685038998, 79.53057619626888);
        }
        else if (selectitdadistrictid == "506") {
            pt = new google.maps.LatLng(16.090529663299993, 80.62920900876888);
        }
        else if (selectitdadistrictid == "510") {
            pt = new google.maps.LatLng(16.259352648959105, 80.93682619626888);
        }
        else if (selectitdadistrictid == "523") {
            pt = new google.maps.LatLng(16.533380247161574, 81.53008791501888);
        }
        else if (selectitdadistrictid == "520") {
            pt = new google.maps.LatLng(17.520812947684213, 82.73858400876888);
        }
        else if (selectitdadistrictid == "521") {
            pt = new google.maps.LatLng(18.271086109608877, 83.29888674314388);
        }
        else if (selectitdadistrictid == "519") {
            pt = new google.maps.LatLng(18.375379094031825, 83.80425783689388);
        }


        map.setCenter(pt);
        map.setZoom(8);
    }


    for (i = 0; i < locations.length; i++) {

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][0], locations[i][1]),
            // please remove comment
            icon: icons[features[i].type].icon,
            map: map
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                var contentString = '<h6>Details</h6>' + '           <h6>Region Name: ' + locations[i][3] + '</h6>' +
                                                                     '<h6>District Name: ' + locations[i][2] + '</h6>' +

                                                                     '<h6>Warehouse Name: ' + locations[i][4] + '</h6>' +
                                                                     '<h6>Warehouse Type: ' + locations[i][5] + '</h6>' +

                                                                      ' <h6>Capacity: ' + locations[i][6] + '</h6>' +
                                                                        '<h6>Manager Name: ' + locations[i][7] + '</h6>' +
                                                                          '<h6>Mobile: ' + locations[i][8] + '</h6>' +
                                                                        '<h6>Active Status: ' + locations[i][9] + '</h6>';
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            }
        })(marker, i));

        google.maps.event.addListener(marker, 'rightclick', (function (marker, i) {
            return function () {


            }
        })(marker, i));
    }
}



$(document).ready(function () {

    Godwanslatlongsdata(0, "alldist");

    $("#AllDistrict").change(function (e) {
        $('#Alltypes').val('all');
        var DISTRICT = $("#AllDistrict").val();

        if (DISTRICT == "all") {
            selectitdadistrictid = "";
            initialize();
            Godwanslatlongsdata(0, "alldist");
        }
        else {
            selectitdadistrictid = DISTRICT;
            initialize();
            Godwanslatlongsdata(selectitdadistrictid, "all");
        }
    });

    $("#Alltypes").change(function (e) {

        var selecttype = $("#Alltypes").val();

        var DISTRICT = $("#AllDistrict").val();
        if (DISTRICT != "all") {
            if (selecttype == "all") {
                initialize();
                var DISTRICT = $("#AllDistrict").val();
                Godwanslatlongsdata(DISTRICT, "all");

            }
            else {
                initialize();
                selecttype = $("#Alltypes").val();
                if (selecttype == "APSWC") {
                    selecttype = "APSWC";
                    initialize();
                    var DISTRICT = $("#AllDistrict").val();
                    Godwanslatlongsdata(DISTRICT, "APSWC");
                }
                else if (selecttype == "OGF") {

                    selecttype = "Other Government Facilities";
                    initialize();
                    var DISTRICT = $("#AllDistrict").val();
                    Godwanslatlongsdata(DISTRICT, "OGF");
                }
                else if (selecttype == "PG") {
                    selecttype = "Private_Godowns";
                    initialize();
                    var DISTRICT = $("#AllDistrict").val();
                    Godwanslatlongsdata(DISTRICT, "PG");
                }

            }
        }
        else {
            if (selecttype == "all") {
                initialize();
                selectitdadistrictid = "";
                Godwanslatlongsdata(0, "alldist");

            }
            else if (selecttype == "APSWC") {
                initialize();
                selectitdadistrictid = "";
                Godwanslatlongsdata(0, "APSWC1");
            }
            else if (selecttype == "OGF") {
                initialize();
                selectitdadistrictid = "";
                Godwanslatlongsdata(0, "OGF1");
            }
            else if (selecttype == "PG") {
                initialize();
                selectitdadistrictid = "";
                Godwanslatlongsdata(0, "PG1");
            }
        }
    });
});


