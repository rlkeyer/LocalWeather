$(document).ready(function() {
  $.getJSON("https://ipapi.co/json/", function(json) {
    var lat = (json.latitude);
    var lon = (json.longitude);
    var weatherAPI = "https://api.apixu.com/v1/current.json?key=dfd6f6d83c664f78aa2200153170103&q=" + lat + "," + lon;
    
    $.getJSON(weatherAPI, function(data) {
      $(".message").html(data.location.name + ", " + data.location.region);
      $(".far").html(data.current.temp_f + "&deg;F");
      $(".message3").html("Feels like: " + data.current.feelslike_f + "&deg" + "F");
      $(".message4").html(data.current.condition.text);
      $("<img src=https:" + data.current.condition.icon + ">").prependTo(".message5");
     
      // Toggles the temperature between F and C
      
      $("#temp-button").on("click", function() {
        var current = $("#degrees").html();
        if (current.indexOf("F") > -1) {
          $(".far").html(data.current.temp_c + "&deg;C");
          $(".message3").html("Feels like: " + data.current.feelslike_c + "&deg" + "C")
        }
        else {
          $(".far").html(data.current.temp_f + "&deg;F");
          $(".message3").html("Feels like: " + data.current.feelslike_f + "&deg" + "F")
        }
        
      });
      
      // Changes the background image depending on the temperature
      
     if (data.current.temp_f <= 40) {
        $("body").css("background-image", "url('./img/cold.jpg')");
     }
      else if (data.current.temp_f > 40 && data.current.temp_f < 70) {
        $("body").css("background-image", "url('./img/moderate.jpg')");
      }
      else {
        $("body").css("background-image", "url('./img/warm.jpg')");
      }
       
    });
  });
});