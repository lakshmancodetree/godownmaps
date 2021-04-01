
var map = null;
var infoWindow = null;

function initMap() {
    //alert("hai");
    LatlongsLoad();

};

/** @this {google.maps.Polygon} */


function LatlongsLoad() {
    var hidField = document.getElementById("mapland").value;
    var url = "/api/ITDA/Latlongslist";
    var input = { "Ben_Id": hidField };
    var location = null;

    $.ajax(
   {
       type: 'POST',
       contentType: 'application/json; charset=utf-8',
       url: '/api/ITDA/Latlongslist',
       data: "{'Ben_Id':'" + hidField + "'}",
       dataType: "json",
       success: function (response) {
           console.log(JSON.stringify(response));
           var dist = response;
           for (var i = 0; i < dist.itdalist.length; i++) {
               var LAT = dist.itdalist[0].LATITUDE;
               var LONG = dist.itdalist[0].LONGITUDE;
               location = new google.maps.LatLng(LAT, LONG);
               map = new google.maps.Map(document.getElementById('map'), {
                   zoom: 18,
                   center: location,
                   mapTypeId: google.maps.MapTypeId.HYBRID
               });

               var PlotLatlongs = [
                   new google.maps.LatLng(18.03451936144686, 82.81241795562768),
                      new google.maps.LatLng(18.0340898398148, 82.81283359489807),
                      new google.maps.LatLng(18.03393220482696, 82.81307556873561),
                      new google.maps.LatLng(18.03413343584108, 82.81318710137121),
                     new google.maps.LatLng(18.03440820641349, 82.81318311454247),
                     new google.maps.LatLng(18.03443094288446, 82.81298276911745),
                      new google.maps.LatLng(18.03455339453122, 82.81290999769517),
                   new google.maps.LatLng(18.03484448191107, 82.81325528178923),
                      new google.maps.LatLng(18.03527021528074, 82.81276179543579),
                   new google.maps.LatLng(18.03485015623868, 82.81220024671296)
               ];
               console.log(PlotLatlongs);
               var result = [];
               for (var i = 0; i < dist.itdalist.length; i++) {
                   var element = new google.maps.LatLng(dist.itdalist[i].LATITUDE, dist.itdalist[i].LONGITUDE)
                   result.push(element);
               }
               // console.log(result);


               // Construct the polygon.
               var landview = new google.maps.Polygon({
                   paths: result,
                   strokeColor: '#ADFF2F',
                   strokeOpacity: 0.8,
                   strokeWeight: 3,
                   fillColor: '',
                   fillOpacity: 0
               });
               landview.setMap(map);

               // Add a listener for the click event.
               landview.addListener('click', showArrays);
               landview.addListener('mouseover', showArrays);
               landview.addListener('mouseout', function () {
                   infoWindow.close();
               });


               var len = landview.getPath().getLength();
               var strArray = "";
               for (var i = 0; i < len; i++) {
                   strArray += landview.getPath().getAt(i).toUrlValue(5) + "<br>";
               }

               document.getElementById('info').innerHTML = strArray;




               infoWindow = new google.maps.InfoWindow;
           }
       },
       error: function (result) {
           alert("Error");
       }
   });



}



