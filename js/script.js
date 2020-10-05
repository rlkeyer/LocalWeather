const CtoF = (temp) => {
  return temp * (9 / 5) + 32;
};

$(document).ready(function () {
  $.getJSON("https://ipapi.co/json/", function (json) {
    var lat = json.latitude;
    var lon = json.longitude;
    var weatherAPI =
      `https://api.weatherstack.com/current?access_key=6b143e85be2d037617c6de9cb74f9e07&query=${lat},${lon}`;

    $.getJSON(weatherAPI, function (data) {
      $(".message").html(`${data.location.name}, ${data.location.region}`);
      $(".far").html(`${CtoF(data.current.temperature)}&deg;F`);
      $(".message3").html(`Feels like: ${CtoF(data.current.feelslike)}&degF`);
      $(".message4").html(data.current.weather_descriptions[0]);
      $(`<img src=${data.current.weather_icons[0]}>`).prependTo(".message5");

      // Toggles the temperature between F and C

      $("#temp-button").on("click", function () {
        var current = $("#degrees").html();
        if (current.indexOf("F") > -1) {
          $(".far").html(`${data.current.temperature}&deg;C`);
          $(".message3").html(`Feels like: ${data.current.feelslike}&degC`);
        } else {
          $(".far").html(`${CtoF(data.current.temperature)}&deg;F`);
          $(".message3").html(
            `Feels like: ${CtoF(data.current.feelslike)}&degF`
          );
        }
      });

      // Changes the background image depending on the temperature

      if (data.current.temperature <= 5) {
        $("body").css("background-image", "url('./img/cold.jpg')");
      } else if (
        data.current.temperature > 5 &&
        data.current.temperature < 22
      ) {
        $("body").css("background-image", "url('./img/moderate.jpg')");
      } else {
        $("body").css("background-image", "url('./img/warm.jpg')");
      }
    });
  });
});
