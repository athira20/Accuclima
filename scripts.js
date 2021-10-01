let weather = {
    apiKey: "686be82807926e5e8497d9a3ad044e94",
    fetchWeather: function (city) {
      fetch(
        api1= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apiKey,

      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { sunrise } = data.sys;
      const { sunset } = data.sys;
      const { temp_max, temp_min, pressure } = data.main;
      const { lat, lon } = data.coord;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "HUMIDITY: " + humidity + "%";
      document.querySelector(".wind").innerText = "WIND SPEED: " + speed + " km/h";
      document.querySelector(".sunrisetime").innerText= sunrise;
      document.querySelector(".sunsettime").innerText= sunset;
      document.querySelector(".temp_ma").innerText = temp_max + "°C";
      document.querySelector(".temp_mi").innerText = temp_min + "°C";
      document.querySelector(".press").innerText =  pressure + " hPa";
      document.querySelector(".lat").innerText = "Lat: "+lat; document.querySelector(".lon").innerText = "Lon: "+lon;
    },


    fetchWeekly: function (lat, lon) {
      fetch(
        api2= "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude="+minutely+"&appid="+this.apiKey,)
        .then((response) => {
          if (!response.ok) {
            alert("No forecast found.");
            throw new Error("No forecast found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeekly(data));
    },

    displayWeekly: function (data) {
      const { lat, lon } = data.coord;
      const { temp } = data.daily.temp.morn;
      document.querySelector(".lat").innerText =  lat; document.querySelector(".lon").innerText =  lon;
      document.querySelector(".mb-0").innerText = temp+"K";
    },

    search: function () { 
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
   document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
   document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
weather.fetchWeather("Singapore");